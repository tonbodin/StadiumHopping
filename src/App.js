import React from 'react';
import GraphVisualizer from './components/GraphVisualizer.js';
import MapContainer from './components/MapContainer.js';
import './App.css';
import { NBA_DATASET, NFL_DATASET } from './data';
import { generateAdjacencyMatrix, generateElements } from './common/util';

let data = NFL_DATASET.splice(0, 7);
export default class App extends React.Component {
    constructor(props) {
        super(props);
        let matrix = generateAdjacencyMatrix(data);
        this.state = {
            data: data,
            matrix: matrix,
            elements: generateElements(matrix, data),
            delay: 1000,
        };
    }
    render() {
        return (
            <div>
                <MapContainer markers={this.state.data} />
                <GraphVisualizer
                    matrix={this.state.matrix}
                    elements={this.state.elements}
                    data={this.state.data}
                />
            </div>
        );
    }
}
