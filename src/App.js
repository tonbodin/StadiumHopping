import React from 'react';
import GraphVisualizer from './components/GraphVisualizer.js';
import MapContainer from './components/MapContainer.js';
import { Controls } from './components/Controls';
import { WelcomeModal } from './components/WelcomeModal';
import './App.css';
import { NBA_DATASET, NFL_DATASET } from './data';
import {
    generateAdjacencyMatrix,
    generateElements,
    randomizeData,
} from './common/util';

let nba = randomizeData(NBA_DATASET);
export default class App extends React.Component {
    constructor(props) {
        super(props);
        let matrix = generateAdjacencyMatrix(nba);
        this.state = {
            data: nba,
            matrix: matrix,
            elements: generateElements(matrix, nba),
            delay: 1000,
            path: [],
            evaluating: '',
            pathMessage: '',
            running: false,
            dataset: 'NBA',
            openModal: false,
        };
        this.updatePath = this.updatePath.bind(this);
        this.stopRunning = this.stopRunning.bind(this);
        this.startRunning = this.startRunning.bind(this);
        this.setEvaluating = this.setEvaluating.bind(this);
        this.setDataset = this.setDataset.bind(this);
        this.reload = this.reload.bind(this);
    }

    updatePath(path, pathMessage) {
        this.setState({ path: path, pathMessage: pathMessage });
    }

    handleClose() {
        this.setState({ openModal: false });
    }

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

    componentDidMount() {
        this.setState({ openModal: true });
    }

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

    setEvaluating(evaluating) {
        this.setState({ evaluating: evaluating });
    }

    stopRunning() {
        this.setState({
            running: false,
        });
    }

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
