import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { data } from './data';

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <Map onClick={this.onMapClicked} google={this.props.google} initialCenter={{lat: 41.4925, lng: -99.9018 }} zoom={4} style={mapStyles}>
        {data && data.records.map((place) => {
          return (
            <Marker
            onClick={this.onMarkerClick}
              key={place.recordid}
              name={place.fields.team}
              icon={{
                url: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/American_football_icon_simple.svg',
                scaledSize: new this.props.google.maps.Size(25, 25)
              }}
              position={{ lat: place.fields.geo_point_2d[0], lng: place.fields.geo_point_2d[1] }}
            />
          );
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCvyC036oaVypkYK47rUpFhYc3dOf2qQ2U",
})(MapContainer);
