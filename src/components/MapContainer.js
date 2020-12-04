import React from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
import { data } from '../data';
import { logos } from '../temp';
import { mapStyle } from '../common/styles';

const mapStyles = {
  width: "50%",
  height: "100%",
};

const teams = data.records.splice(0, 5);

export class MapContainer extends React.Component {
  state = {
    polyline: [],
  }
  render() {
    return (
        <Map onClick={this.onMapClicked} google={this.props.google} initialCenter={{lat: 37.0902, lng: -95.7129 }} zoom={4} style={mapStyles}>
        {teams.map((place) => {
          return (
            <Marker
              key={place.recordid}
              name={place.fields.team}
              icon={{
                url: logos.find(logo => logo.team === place.fields.team).team_logo,
                scaledSize: new this.props.google.maps.Size(35, 25)
              }}
              position={{ lat: place.fields.latitude, lng: place.fields.longitude }}
            />
          );
        })}
      </Map>
    );
  }
}

//   onHover = (props, line, event) => {
//     console.log(this.state.polyline[0].props, props);
//     console.log(this.state.polyline.find(p => p.props === props));
//     line.setOptions({strokeColor: "black"});
//   }

//   renderLines() {
//     let output = [];
//     teams.forEach((place, index) => {
//       return teams.forEach((stadium, i) => {
//         if(index !== i) {
//           const path = [[{lat: parseFloat(place.fields.latitude), lng: parseFloat(place.fields.longitude)}, {lat: parseFloat(stadium.fields.latitude), lng: parseFloat(stadium.fields.longitude)}], "orange"];
//           output.push(path)
//         }
//     })
//       });
//       let result = output.map((p) => {
//         return <Polyline
//         onMouseover={this.onHover}
//           path={p[0]}
//           strokeColor={p[1]}
//           strokeOpacity={0.8}
//           strokeWeight={2} />;
//       });
//     this.setState({
//       polyline: result
//     }, () => console.log(this.state.polyline));
//   }
// }

export default GoogleApiWrapper({
  apiKey: "AIzaSyCvyC036oaVypkYK47rUpFhYc3dOf2qQ2U",
})(MapContainer);
