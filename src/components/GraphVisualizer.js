import React, { Component } from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';
import { makeArray, colorPath, customNode } from '../common/util';
import { graphStyle } from '../common/styles';

let selectedNodes = {};

export default class GraphVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: props.elements,
        };
    }

    visitNodes(start, end) {
        selectedNodes[this.state.elements[start].id] = 1;
        let elem1 = this.state.elements.find(
            (e) => e.id === `__${start}__${end}`,
        );
        let elem2 = this.state.elements.find(
            (e) => e.id === `__${end}__${start}`,
        );
        selectedNodes[elem1.id] = 1;
        selectedNodes[elem2.id] = 1;
        this.props.setEvaluating(
            `Visiting ${this.props.data[end].team} from ${this.props.data[start].team}`,
        );
        this.setState({
            elements: colorPath(this.state.elements, selectedNodes),
        });
    }
    unvisitNodes(start, end) {
        delete selectedNodes[this.state.elements[start].id];
        let elem1 = this.state.elements.find(
            (e) => e.id === `__${start}__${end}`,
        );
        let elem2 = this.state.elements.find(
            (e) => e.id === `__${end}__${start}`,
        );
        delete selectedNodes[elem1.id];
        delete selectedNodes[elem2.id];
        this.props.setEvaluating(`Unvisiting ${this.props.data[end].team}`);
        this.setState({
            elements: colorPath(this.state.elements, selectedNodes),
        });
    }

    travellingSalesperson = async (matrix) => {
        const N = matrix.length;
        let memo = makeArray(N, Math.pow(2, N), -1);
        let pathState = makeArray(N, Math.pow(2, N), 0);
        let FINAL_STATE = (1 << N) - 1;
        let cost = await this.helper(
            matrix,
            pathState,
            memo,
            FINAL_STATE,
            N,
            1,
            0,
        );
        this.props.stopRunning();
        await this.listOptimalPath(pathState);
    };
    listOptimalPath = async (pathState) => {
        let optimalPath = [];
        let index = 0;
        let position = 1;
        while (true) {
            optimalPath.push(index);
            let nextIndex = pathState[position][index];
            if (nextIndex === 0) break;
            let nextPosition = position | (1 << nextIndex);
            position = nextPosition;
            index = nextIndex;
        }
        optimalPath.push(0);
        let z = this.props.data[optimalPath[0]].team;
        for (let i = 1; i < optimalPath.length; i++) {
            this.visitNodes(optimalPath[i - 1], optimalPath[i]);
            await this.sleep(this.props.delay / 2);
            z = z + ' ---> ' + this.props.data[optimalPath[i]].team;
        }
        this.props.callback(optimalPath);
        this.props.setEvaluating(z);
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
            this.visitNodes(position, 0);
            await this.sleep(this.props.delay / 2);
            this.unvisitNodes(position, 0);
            return matrix[position][0];
        } else if (memo[visited][position] !== -1) {
            return memo[visited][position];
        }
        let min = Number.MAX_SAFE_INTEGER;
        let index = -1;
        for (let i = 0; i < N; i++) {
            if ((visited & (1 << i)) === 0) {
                this.visitNodes(position, i);
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
                    ));
                if (ans < min) {
                    min = ans;
                    index = i;
                }
                await this.sleep(this.props.delay / 2);
                this.unvisitNodes(position, i);
            }
        }

        pathState[visited][position] = index;
        return (memo[visited][position] = min);
    };
    sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.running && this.props.running !== prevProps.running) {
            selectedNodes = {};
            this.setState(
                {
                    elements: colorPath(this.state.elements, selectedNodes),
                },
                () => this.travellingSalesperson(this.props.matrix),
            );
        }
        if (this.props.elements !== prevProps.elements) {
            this.setState({ elements: this.props.elements });
        }
    }

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
