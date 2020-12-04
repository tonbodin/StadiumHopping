export const selectedNodeStyle = {
  background: "#23C779",
  color: "white",
  width: 50,
  height: 50,
  borderRadius: '50%',
  fontFamily: "Helvetica",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const unselectedNodeStyle = {
  background: "white",
  color: "#23C779",
  width: 50,
  height: 50,
  borderRadius: '50%',
  fontFamily: "Helvetica",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const unselectedEdgeStyle = {
  stroke: "#dddddddd",
  strokeWidth: 2,
};

export const selectedEdgeStyle = {
  stroke: "#23C779",
  strokeWidth: 4,
};

export const graphStyle = {
  height: window.innerHeight,
  width: window.innerWidth / 2,
  background: "#110A2E",
  float: 'right',
};

export const costTextStyle = {
  position: "absolute",
  left: 20,
  top: 110,
  color: "white",
};

export const pathTextStyle = {
  position: "absolute",
  left: 20,
  top: 135,
  color: "white",
};

export const currentTextStyle = {
  position: "absolute",
  left: 20,
  top: 160,
  color: "white",
};

export const delayTextStyle = {
  position: "absolute",
  left: 20,
  top: 185,
  zIndex: 4,
  width: 100,
  color: "white",
};

export const titleTextStyle = {
  position: "absolute",
  left: 20,
  top: 20,
  zIndex: 4,
  fontSize: 25,
  fontWeight: "bold",
  color: "white",
};

export const sliderStyle = {
  color: "#23C779",
  position: "absolute",
  left: 105,
  top: 180,
  zIndex: 4,
  width: 200,
};

export const replayButtonStyle = {
  position: "absolute",
  left: 135,
  top: 60,
  zIndex: 4,
  background: "#d90368",
  color: "white",
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 10,
  paddingBottom: 10,
  border: "none",
  borderRadius: 4,
};

export const startButtonStyle = {
  position: "absolute",
  left: 20,
  top: 60,
  zIndex: 4,
  background: "#23C779",
  color: "white",
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 10,
  paddingBottom: 10,
  border: "none",
  borderRadius: 4,
};

export const handleStyle = {
  zIndex: -9999,
  pointerEvents: "none",
  opacity: 0,
  top: "50%",
};
