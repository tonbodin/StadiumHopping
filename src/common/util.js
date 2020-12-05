import dagre from 'dagre';
import {
    handleStyle,
    selectedNodeStyle,
    unselectedNodeStyle,
    selectedEdgeStyle,
    unselectedEdgeStyle,
    nodeImageStyle,
} from './styles';
import { Handle, isEdge } from 'react-flow-renderer';

export const generateElements = (matrix, object) => {
    return generateFlow(generateLinkNodeRep(matrix), object);
};

// taken from Google Maps Docs
function haversine_distance(i, j) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = i.latitude * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = j.latitude * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (j.longitude - i.longitude) * (Math.PI / 180); // Radian difference (longitudes)

    var d =
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) *
                        Math.cos(rlat2) *
                        Math.sin(difflon / 2) *
                        Math.sin(difflon / 2),
            ),
        );
    return d;
}

export const generateAdjacencyMatrix = (arr) => {
    let result = makeArray(arr.length, arr.length, 0);
    arr.forEach((obj1, idx1) => {
        arr.forEach((obj2, idx2) => {
            if (idx1 !== idx2) {
                result[idx1][idx2] = result[idx2][idx1] = haversine_distance(
                    obj1,
                    obj2,
                );
            }
        });
    });
    return result;
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

const generateFlow = (elements, objects) => {
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
        return result;
    };

    const nodes = g.nodes().map((i) => {
        let n = g.node(i);
        const pos = generatePositions(g.nodeCount());
        return {
            id: i,
            data: {
                img: objects[i].logo,
            },
            draggable: false,
            style: unselectedNodeStyle,
            type: 'customNode',
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
        type: 'straight',
        style: unselectedEdgeStyle,
        target: e.v,
        label: Math.floor(e.name) + ' mi',
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 5,
        labelBgStyle: { fill: '#dddddddd' },
        labelStyle: { fill: '#110A2E', fontWeight: 700 },
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
                <img src={data.img} alt="team_logo" style={nodeImageStyle} />
            </div>
            <Handle type="source" position="top" style={handleStyle} />
        </>
    );
};
