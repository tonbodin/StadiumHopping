import dagre from "dagre";
import {
  handleStyle,
  selectedNodeStyle,
  unselectedNodeStyle,
  selectedEdgeStyle,
  unselectedEdgeStyle,
} from "./styles";
import { Handle, isEdge } from "react-flow-renderer";

export const elements = (matrix) => {
  return generateFlow(generateLinkNodeRep(matrix));
};

export const generateAdjacencyMatrix = () => {
  let x = Math.floor(Math.random() * 3 + 5);
  var array = new Array(x);
  for (let i = 0; i < x; i++) {
    array[i] = [];
  }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < x; j++) {
      let y = Math.floor(Math.random() * 10 + 1);
      if (i !== j) {
        array[i][j] = array[j][i] = y;
      } else {
        array[i][j] = array[j][i] = 0;
      }
    }
  }
  return array;
};

export const makeArray = (w, h, val) => {
  var arr = [];
  for (let i = 0; i < h; i++) {
    arr[i] = [];
    for (let j = 0; j < w; j++) {
      arr[i][j] = val;
    }
  }
  return arr;
};

const generateLinkNodeRep = (adjMatrix) => {
  let result = [];
  adjMatrix.forEach((arr) => {
    for (let i = 0; i < arr.length; i++) {
      let obj = {
        name: i,
        links: getLinks(i, adjMatrix),
      };
      result.push(obj);
    }
  });
  return result;
};

const getLinks = (index, adjMatrix) => {
  let result = [];
  for (let i = 0; i < adjMatrix[index].length; i++) {
    if (adjMatrix[index][i] !== 0) {
      let link = {
        name: i,
        weight: adjMatrix[index][i],
      };
      result.push(link);
    }
  }
  return result;
};

const generateFlow = (elements) => {
  const g = new dagre.graphlib.Graph({ multigraph: true });
  g.setGraph({
    marginx: 50,
    marginy: 50,
  });
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  elements.forEach((e) => {
    g.setNode(e.name, {
      label: e.name,
      width: 50,
      height: 50,
    });
    e.links.forEach((i) => {
      g.setEdge(e.name, i.name, e.name.toString, i.weight);
    });
  });
  dagre.layout(g);
  const generatePositions = (number) => {
    let result = [];
    const angleFactor = (2 * Math.PI) / number;
    let angle;
    for (let i = 0; i < number; i++) {
      angle = i * angleFactor;
      let x = 400 * Math.cos(angle);
      let y = 400 * Math.sin(angle);
      result.push([x, y]);
    }
    console.log(result);
    return result;
  };

  // const pos = generatePositions(g.nodeCount());
  const nodes = g.nodes().map((i) => {
    let n = g.node(i);
    let pos = generatePositions(g.nodeCount());
    return {
      id: i,
      data: {
        label: i,
      },
      draggable: false,
      style: unselectedNodeStyle,
      type: "customNode",
      width: n.width,
      height: n.height,
      position: {
        x: pos[i][0] - n.width / 2,
        y: pos[i][1] - n.height / 2,
      },
    };
  });
  const edges = g.edges().map((e) => ({
    id: `__${e.v}__${e.w}`,
    points: g.edge(e).points,
    source: e.w,
    type: "straight",
    style: unselectedEdgeStyle,
    target: e.v,
    label: "Weight: " + e.name,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 5,
    labelBgStyle: { fill: "#dddddddd" },
    labelStyle: { fill: "#110A2E", fontWeight: 700 },
  }));

  return [...nodes, ...edges];
};

export const colorPath = (elements, selectedElements) => {
  if (elements != null) {
    const newElements = elements.map((e) => {
      if (isEdge(e)) {
        if (selectedElements.hasOwnProperty(e.id)) {
          return { ...e, style: selectedEdgeStyle };
        } else {
          return { ...e, style: unselectedEdgeStyle };
        }
      } else {
        if (selectedElements.hasOwnProperty(e.id)) {
          return { ...e, style: selectedNodeStyle };
        } else {
          return { ...e, style: unselectedNodeStyle };
        }
      }
    });
    return newElements;
  }
  return elements;
};

export const customNode = ({ data }) => {
  return (
    <>
      <Handle type="target" position="top" style={handleStyle} />
      <div>
        <div>{data.label}</div>
      </div>
      <Handle type="source" position="top" style={handleStyle} />
    </>
  );
};
