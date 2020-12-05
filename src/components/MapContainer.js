import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import '../App';
import mapStyles from '../common/mapStyles.json';
import customMapMarker from '../common/customMapMarker';

export class MapContainer extends React.Component {
    _mapLoaded(mapProps, map) {
        map.setOptions({
            styles: mapStyles,
        });
        this.props.markers.forEach((team) => {
            customMapMarker({
                latlng: new this.props.google.maps.LatLng(
                    team.latitude,
                    team.longitude,
                ),
                google: this.props.google,
                map: map,
                html: `
                  <div id="marker-container">
                    <img id="marker" src=${team.logo}>
                  </div>
                `,
            });
        });
    }
    render() {
        return (
            <Map
                onClick={this.onMapClicked}
                style={{ width: '50%', height: '100%' }}
                google={this.props.google}
                initialCenter={{ lat: 37.0902, lng: -95.7129 }}
                zoom={4}
                onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
            >
                {/* {this.props.markers.map((team) => {
                    return (
                        <Marker
                            key={team.abv}
                            name={team.team}
                            icon={{
                                url: team.logo,
                                scaledSize: new this.props.google.maps.Size(
                                    35,
                                    35,
                                ),
                            }}
                            position={{
                                lat: team.latitude,
                                lng: team.longitude,
                            }}
                        />
                    );
                })} */}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCvyC036oaVypkYK47rUpFhYc3dOf2qQ2U',
})(MapContainer);
