export const selectedNodeStyle = {
    background: '#146474',
    width: 70,
    height: 70,
    borderRadius: '50%',
    overflow: 'hidden',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const unselectedNodeStyle = {
    background: 'white',
    width: 70,
    height: 70,
    borderRadius: '50%',
    overflow: 'hidden',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const unselectedEdgeStyle = {
    stroke: '#dddddd77',
    strokeWidth: 1,
};

export const selectedEdgeStyle = {
    stroke: '#146474',
    strokeWidth: 5.5,
};

export const graphStyle = {
    height: window.innerHeight * 0.8,
    background: '#021019',
    float: 'right',
};

export const nodeImageStyle = { width: 50 };

export const textStyle = {
    color: 'white',
};

export const titleTextStyle = {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
};

export const sliderStyle = {
    color: '#146474',
    width: 200,
};

export const replayButtonStyle = {
    zIndex: 4,
    background: '#0c4152',
    color: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    border: 'none',
    borderRadius: 4,
};

export const startButtonStyle = {
    zIndex: 4,
    background: '#08304b',
    color: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    border: 'none',
    borderRadius: 4,
};

export const handleStyle = {
    zIndex: -9999,
    pointerEvents: 'none',
    opacity: 0,
    top: '50%',
};
