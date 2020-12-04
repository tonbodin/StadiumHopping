import React from 'react';
import GraphVisualizer from './components/GraphVisualizer.js';
import MapContainer from './components/MapContainer.js';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
    <div>
    <MapContainer />
    <GraphVisualizer />
    </div>
    );
  }
}