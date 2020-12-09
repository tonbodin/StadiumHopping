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
    return generateFlow(getLinkNodeRepresentation(matrix), object);
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

export const randomizeData = (arr) => {
    let x = Math.floor(Math.random() * 3 + 5);
    const temp = [...arr];
    let result = [];
    for (let i = 0; i < x; i++) {
        let randIndex = Math.floor(Math.random() * (temp.length - 1));
        result.push(temp.splice(randIndex, 1)[0]);
    }
    return result;
};

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

const getLinkNodeRepresentation = (adjMatrix) => {
    let result = [];
    adjMatrix.forEach((arr, i) => {
        let obj = {
            name: i,
            links: getLinks(i, adjMatrix),
        };
        result.push(obj);
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

const generateFlow = (elements, objects) => {
    const nodes = elements.map((node, idx) => {
        const pos = generatePositions(elements.length);
        return {
            id: node.name.toString(),
            data: {
                img: objects[idx].logo,
            },
            draggable: false,
            style: unselectedNodeStyle,
            type: 'customNode',
            width: 50,
            height: 50,
            position: {
                x: pos[idx][0] - 25,
                y: pos[idx][1] - 25,
            },
        };
    });
    const edges = elements.map((node) => {
        return node.links.map((edge) => ({
            id: `__${node.name}__${edge.name}`,
            source: node.name.toString(),
            type: 'straight',
            style: unselectedEdgeStyle,
            target: edge.name.toString(),
            label: Math.floor(edge.weight) + ' mi',
            labelBgPadding: [8, 4],
            labelBgBorderRadius: 5,
            labelBgStyle: { fill: '#dddddddd' },
            labelStyle: { fill: '#110A2E', fontWeight: 700 },
        }));
    });

    console.log([...nodes, ...edges.flat()]);
    return [...nodes, ...edges.flat()];
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
