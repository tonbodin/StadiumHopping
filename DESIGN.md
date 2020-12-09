# Stadium Hopping

## Framework Choices

This project is called Stadium Hopping, an interactive and user-friendly application tailored to the sports fanatics of this world. Stadium Hopping is a React.js program that uses a multitude of modules and libraries for visuals. We decided to go with React.js because it is a simple, state-based reactive framework for making webapps. The key part of this is that it is reactive. In our web app we wanted to be able to update the data dynamically and have that reflect in the user interface. Another plus point for react is that we already had some experience with react-native and React.js was not a very steep learning curve from there.

## Components Directory

### `WelcomeModal.js`

Upon running the program, this is the first visual that is rendered. This class uses a Dialog Tag to explain to users what the program will do and brief instructions on how to interact with the program.

### `Controls.js`

This file is responsible for the program’s main user interaction. A dropdown menu was implemented using a Menu tag for users to toggle between NBA and NFL datasets, and a slider was implemented using a Slider tag for users to control the speed of the program. The controls also allow users to begin generating the shortest path between a randomly selected group of NFL/NBA stadiums whenever they please. Users also have the ability to refresh a dataset to get a new, randomly selected grouping of stadiums.

### `GraphVisualizer.js`

This file is responsible for displaying the randomly selected stadiums in a graph format, with team logos as nodes and distances as weights. The graph is rendered using the React Flow library, and the graph updates based on the travelling salesman algorithm embedded into this class. This panel allows users to peek under the hood of a travelling salesman algorithm and track the paths that are constructed by the program and compared against other paths. The edges between the team icons are colored as they are visited by the algorithm, and uncolored when the program is done constructing and processing the path created. The optimal path is left colored at the end for the user to see.

### `MapContainer.js`

This class uses google maps react to render the optimal path on an actual map for visual clarity. The nodes are positioned using markers and the paths are created using a polyline. The markers on the map are rendered using a customMarkerClass that renders the logo on a customized HTML div instead of using the default red pin marker icon.

## Common Directory

Our program also has a directory called “common” with common files used between all other files. There are three files inside common, “styles.js”, "mapstyles.json", and “util.js”.

### `Styles.js`

Contains a series of exported javascript style objects that are applied to various jsx elements throughout our app.

### `Util.js`

We also have a lot of static helper methods that are stored in the util.js file for clarity. These methods are used across our various components and are placed in their own component for clarity.

### `MapStyles.json`

Defines the json object passed into the map to render it with the desired colors

## Data

Lastly, our data is stored inside a directory under src called “data”. This directory has files representing our two datasets which are the NBA and NFL teams. We also have a file that represents the KML data for our google map to only render the United States on the map.

## NOTE about GraphVisualizer and MapContainer

We initially wanted to overlay the graph visualizer over the map rendered by google maps react, but setting the markers and updating the polylines at the right positions proved to be a difficult task. Therefore, we decided to separate the visualization portion from the map, and we believe that this was a more user friendly approach as well.
