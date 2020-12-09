import React, { Component } from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';
import { makeArray, colorPath, customNode } from '../common/util';
import { graphStyle } from '../common/styles';

// JS object that defines currently selected nodes and elements when visualizing
let selectedNodes = {};

class GraphVisualizer extends Component {
    //constructor that initialize state with props
    constructor(props) {
        super(props);
        this.state = {
            elements: props.elements,
        };
    }

    // called when props are updated in the component lifecycle
    componentDidUpdate(prevProps) {
        // if the start button is clicked again, uncolor allnodes and start the algorithm
        if (this.props.running && this.props.running !== prevProps.running) {
            selectedNodes = {};
            this.setState(
                {
                    elements: colorPath(this.state.elements, selectedNodes),
                },
                () => this.tsp(this.props.matrix),
            );
        }
        // if the dataset is changed, set the state appropriately
        if (this.props.elements !== prevProps.elements) {
            this.setState({ elements: this.props.elements });
        }
    }

    // colors the appropriate node and the path to the node
    visitNodes(start, end) {
        //adds the given node to the selectedNodes object
        selectedNodes[this.state.elements[start].id] = 1;

        //adds both the outgoing and incoming paths to the selectedNodes
        let elem1 = this.state.elements.find(
            (e) => e.id === `__${start}__${end}`,
        );
        let elem2 = this.state.elements.find(
            (e) => e.id === `__${end}__${start}`,
        );
        selectedNodes[elem1.id] = 1;
        selectedNodes[elem2.id] = 1;

        // sets the currently evaluating message
        this.props.setEvaluating(
            `Visiting ${this.props.data[end].team} from ${this.props.data[start].team}`,
        );

        // rerenders the graph with the appropriate nodes and graphs colored
        this.setState({
            elements: colorPath(this.state.elements, selectedNodes),
        });
    }

    //uncolors the given nodes after it has been visited
    unvisitNodes(start, end) {
        //deletes the given node from the selectedNodes object
        delete selectedNodes[this.state.elements[start].id];

        //deletes the outgoing and incoming paths
        let elem1 = this.state.elements.find(
            (e) => e.id === `__${start}__${end}`,
        );
        let elem2 = this.state.elements.find(
            (e) => e.id === `__${end}__${start}`,
        );
        delete selectedNodes[elem1.id];
        delete selectedNodes[elem2.id];

        //sets the currently evaluating message
        this.props.setEvaluating(`Unvisiting ${this.props.data[end].team}`);

        //rerenders the graph with the appropriate nodes and paths uncolored
        this.setState({
            elements: colorPath(this.state.elements, selectedNodes),
        });
    }

    // main tsp function that sets up the memo and calls the recursive helper
    // async functionality allows us to await coloring the nodes and then waiting for the delay to see the visualization
    tsp = async (matrix) => {
        const N = matrix.length;
        let memo = makeArray(N, Math.pow(2, N), -1); //initializes the memo array
        let pathState = makeArray(N, Math.pow(2, N), 0); //initializes the array that stores the state of the path
        const FINAL_STATE = (1 << N) - 1; //used for the recursive base case when all nodes have been visited and algorithm needs to backtrack
        await this.helper(matrix, pathState, memo, FINAL_STATE, N, 1, 0); //call to the recursive helper
        await this.listOptimalPath(pathState); // after algorithm is evaluated, the optimal path is calculated from the path state array
        this.props.stopRunning(); // stops running the algorithm
    };

    // calculates the optimal path and colors it on the graph and sets the evaluating message to the final path
    listOptimalPath = async (pathState) => {
        let optimalPath = [];
        let index = 0;
        let position = 1;

        // while loop block adapted from https://github.com/jhackshaw/tspvis/blob/master/src/solvers/exhaustive/depthFirstSearch.worker.js
        while (true) {
            optimalPath.push(index);
            let nextIndex = pathState[position][index];
            if (nextIndex === 0) break;
            let nextPosition = position | (1 << nextIndex);
            position = nextPosition;
            index = nextIndex;
        }
        optimalPath.push(0);
        let message = this.props.data[optimalPath[0]].team;
        for (let i = 1; i < optimalPath.length; i++) {
            this.visitNodes(optimalPath[i - 1], optimalPath[i]);
            await this.sleep(this.props.delay / 2);
            message = message + ' ✈ ' + this.props.data[optimalPath[i]].team;
        }
        //renders the optimal path on the map
        this.props.callback(optimalPath);
        //sets the evaluating message to the final path
        this.props.setEvaluating(message);
    };
    helper = async (
        matrix,
        pathState,
        memo,
        FINAL_STATE,
        N,
        visited,
        position,
    ) => {
        if (visited === FINAL_STATE) {
            //base case where the cost that needs to be evaluated is the weight between the current node and the start node
            //colors the nodes for the base case
            this.visitNodes(position, 0);
            await this.sleep(this.props.delay / 2);
            this.unvisitNodes(position, 0);

            //  returns the weight of the journey back to the start node
            return matrix[position][0];
        } else if (memo[visited][position] !== -1) {
            // dp case if our solution has already been computed
            return memo[visited][position]; // return the precomputed solution
        }
        let min = Number.MAX_SAFE_INTEGER; // min cost path
        let index = -1; // the index of the correct city to add to our optimized path
        for (let i = 0; i < N; i++) {
            if ((visited & (1 << i)) === 0) {
                this.visitNodes(position, i); //color the node we are evaluating
                await this.sleep(this.props.delay / 2);
                let ans =
                    matrix[position][i] +
                    (await this.helper(
                        matrix,
                        pathState,
                        memo,
                        FINAL_STATE,
                        N,
                        visited | (1 << i),
                        i,
                    )); //recursive call
                if (ans < min) {
                    // if this answer is a minimum, keep it and store the node that gave us the minimum
                    min = ans;
                    index = i;
                }
                await this.sleep(this.props.delay / 2); // decolor the node
                this.unvisitNodes(position, i);
            }
        }

        pathState[visited][position] = index; // store the node that gives us the locally optimized path
        return (memo[visited][position] = min); // return the min cost while saving it to our memo
    };

    //helper method that asynchronously sets a timeout to stop the visualization
    sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    render() {
        return (
            <div style={graphStyle}>
                <ReactFlow
                    elements={this.state.elements}
                    onLoad={(reactFlowInstance) => reactFlowInstance.fitView()}
                    connectionLineType="straight"
                    nodeTypes={{
                        customNode: customNode,
                    }}
                >
                    <Controls />
                </ReactFlow>
            </div>
        );
    }
}

export { GraphVisualizer };
