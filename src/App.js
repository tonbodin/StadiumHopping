// imports
import React from 'react';
import { GraphVisualizer, Controls, WelcomeModal } from './components';
import MapContainer from './components/MapContainer';
import './App.css';
import { NBA_DATASET, NFL_DATASET } from './data';
import {
    generateAdjacencyMatrix,
    generateElements,
    randomizeData,
} from './common/util';

// initialize default dataset
let nba = randomizeData(NBA_DATASET);
export default class App extends React.Component {
    // constructor
    constructor(props) {
        super(props);
        let matrix = generateAdjacencyMatrix(nba); // generate's graph adjacency matrix
        this.state = {
            data: nba,
            matrix: matrix,
            elements: generateElements(matrix, nba), // generates element representation for the graph renderer
            delay: 1000,
            path: [],
            evaluating: '',
            pathMessage: '',
            running: false,
            dataset: 'NBA',
            openModal: true,
        };

        // binding methods to local 'this' context
        this.updatePath = this.updatePath.bind(this);
        this.stopRunning = this.stopRunning.bind(this);
        this.startRunning = this.startRunning.bind(this);
        this.setEvaluating = this.setEvaluating.bind(this);
        this.setDataset = this.setDataset.bind(this);
        this.reload = this.reload.bind(this);
    }

    // updates path message and the final path on the map after the algorithm is evaluated
    updatePath(path, pathMessage) {
        this.setState({ path: path, pathMessage: pathMessage });
    }

    // handles the modal being closed
    handleClose() {
        this.setState({ openModal: false });
    }

    // sets the dataset based on the selector and reinitializes the data
    setDataset(dataset) {
        if (this.state.dataset !== dataset) {
            let data =
                dataset === 'NBA'
                    ? randomizeData(NBA_DATASET)
                    : randomizeData(NFL_DATASET);
            let matrix = generateAdjacencyMatrix(data);
            this.setState({
                dataset: dataset,
                data: data,
                matrix: matrix,
                elements: generateElements(matrix, data),
                path: [],
                evaluating: '',
                pathMessage: '',
                running: false,
            });
        }
    }

    // reload the components with newly randomized data from the dataset and reinitialize other properties
    reload() {
        let data =
            this.state.dataset === 'NBA'
                ? randomizeData(NBA_DATASET)
                : randomizeData(NFL_DATASET);
        let matrix = generateAdjacencyMatrix(data);
        this.setState({
            data: data,
            matrix: matrix,
            elements: generateElements(matrix, data),
            path: [],
            evaluating: '',
            pathMessage: '',
            running: false,
        });
    }

    // method to set the currently evaluating path
    setEvaluating(evaluating) {
        this.setState({ evaluating: evaluating });
    }

    // called after the algorithm is evaluated
    stopRunning() {
        this.setState({
            running: false,
        });
    }

    // called when start button is clicked and resets some values
    startRunning() {
        this.setState({
            path: [],
            evaluating: '',
            pathMessage: '',
            running: true,
            dataset: this.state.dataset,
        });
    }

    render() {
        return (
            <div className="grid-container">
                <MapContainer
                    markers={this.state.data}
                    polyline={this.state.path}
                />
                <GraphVisualizer
                    matrix={this.state.matrix}
                    elements={this.state.elements}
                    data={this.state.data}
                    delay={this.state.delay}
                    callback={this.updatePath}
                    running={this.state.running}
                    stopRunning={this.stopRunning}
                    setEvaluating={this.setEvaluating}
                />
                <Controls
                    startButton={this.startRunning}
                    delay={this.state.delay}
                    dataset={this.state.dataset}
                    replay={this.reload}
                    setDataset={this.setDataset}
                    running={this.state.running}
                    evaluating={this.state.evaluating}
                    onChangeSlider={(event, value) =>
                        this.setState({ delay: value })
                    }
                />
                <WelcomeModal
                    open={this.state.openModal}
                    handleClose={() => this.handleClose()}
                />
            </div>
        );
    }
}
