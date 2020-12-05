import React, { Component } from 'react';
import ReactFlow, {
    removeElements,
    addEdge,
    Controls,
    Background,
    isNode,
} from 'react-flow-renderer';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import {
    makeArray,
    generateAdjacencyMatrix,
    colorPath,
    customNode,
} from '../common/util';
import {
    costTextStyle,
    currentTextStyle,
    delayTextStyle,
    graphStyle,
    pathTextStyle,
    replayButtonStyle,
    sliderStyle,
    startButtonStyle,
    titleTextStyle,
} from '../common/styles';

let selectedNodes = {};

export default class GraphVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: props.matrix,
            elements: props.elements,
            data: props.data,
            delay: 1000,
            path: '',
            answer: '',
            message: '',
        };
    }

    onElementsRemove = (elementsToRemove) =>
        this.setState({
            elements: removeElements(elementsToRemove, this.state.elements),
        });
    onConnect = (params) =>
        this.setState({ elements: addEdge(params, this.state.elements) });
    onLoad = (reactFlowInstance) => reactFlowInstance.fitView();
    onSelectionChange = (elements) =>
        console.log('selection change', this.state.elements);
    onElementClick = (event, element) =>
        console.log(`${isNode(element) ? 'node' : 'edge'} click:`, element);
    onNodeDragStart = (event, node) => console.log('drag start', node);
    onNodeDragStop = (event, node) => console.log('drag stop', node);
    onPaneClick = (event) => console.log('pane click', event);
    onPaneScroll = (event) => console.log('pane scroll', event);
    onPaneContextMenu = (event) => console.log('pane context menu', event);
    onSelectionDrag = (event, nodes) => console.log('selection drag', nodes);
    onSelectionDragStart = (event, nodes) =>
        console.log('selection drag start', nodes);
    onSelectionDragStop = (event, nodes) =>
        console.log('selection drag stop', nodes);
    onSelectionContextMenu = (event, nodes) => {
        event.preventDefault();
        console.log('selection context menu', nodes);
    };
    onMoveEnd = (transform) => console.log('zoom/move end', transform);

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
        this.setState({
            elements: colorPath(this.state.elements, selectedNodes),
            message: `Visiting ${this.state.data[end].abv} from ${this.state.data[start].abv}`,
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
        this.setState({
            elements: colorPath(this.state.elements, selectedNodes),
            message: `Unvisiting Node ${this.state.data[end].abv}`,
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
        this.setState({
            answer: cost,
            path: this.listOptimalPath(pathState),
        });
    };
    listOptimalPath = (pathState) => {
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
        let z = this.state.data[optimalPath[0]].abv;
        for (let i = 1; i < optimalPath.length; i++) {
            z = z + ' ---> ' + this.state.data[optimalPath[i]].abv;
        }
        return z;
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
            await this.sleep(this.state.delay / 2);
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
                await this.sleep(this.state.delay / 2);
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
                await this.sleep(this.state.delay / 2);
                this.unvisitNodes(position, i);
            }
        }

        pathState[visited][position] = index;
        return (memo[visited][position] = min);
    };
    sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    render() {
        return (
            <div style={graphStyle}>
                <ReactFlow
                    elements={this.state.elements}
                    onElementClick={this.onElementClick}
                    onElementsRemove={this.onElementsRemove}
                    onConnect={this.onConnect}
                    onPaneClick={this.onPaneClick}
                    onPaneScroll={this.onPaneScroll}
                    onPaneContextMenu={this.onPaneContextMenu}
                    onNodeDragStart={this.onNodeDragStart}
                    onNodeDragStop={this.onNodeDragStop}
                    onSelectionDragStart={this.onSelectionDragStart}
                    onSelectionDrag={this.onSelectionDrag}
                    onSelectionDragStop={this.onSelectionDragStop}
                    onSelectionContextMenu={this.onSelectionContextMenu}
                    onSelectionChange={this.onSelectionChange}
                    onMoveEnd={this.onMoveEnd}
                    onLoad={this.onLoad}
                    connectionLineType="straight"
                    nodeTypes={{
                        customNode: customNode,
                    }}
                >
                    <Controls />
                    <Background color="#ffffff22" />
                    <div style={costTextStyle}>Cost: {this.state.answer}</div>
                    <div style={pathTextStyle}>Path: {this.state.path}</div>
                    <div style={currentTextStyle}>
                        Current: {this.state.message}
                    </div>
                    <div style={delayTextStyle}>Delay(ms)</div>
                    <Button
                        variant="contained"
                        onClick={() =>
                            this.travellingSalesperson(this.state.matrix)
                        }
                        style={startButtonStyle}
                    >
                        Start
                    </Button>
                    <Slider
                        min={100}
                        max={1500}
                        value={this.state.delay}
                        step={50}
                        style={sliderStyle}
                        onChange={(event, value) =>
                            this.setState({ delay: value })
                        }
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                    />
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload(false)}
                        style={replayButtonStyle}
                    >
                        <ReplayIcon />
                    </Button>
                </ReactFlow>
            </div>
        );
    }
}
