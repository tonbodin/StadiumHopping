import React from 'react';
import { Map, GoogleApiWrapper, Polyline, InfoWindow } from 'google-maps-react';
import '../App';
import mapStyles from '../common/mapStyles.json';
import { USAGeoData } from '../data/USAGeoData.js';

export class MapContainer extends React.Component {
    state = {
        map: {},
        markers: [],
        selectedMarker: {},
        showingInfoWindow: false,
    };

    _mapLoaded(mapProps, map) {
        map.setOptions({
            styles: mapStyles,
        });

        map.data.setStyle({
            fillColor: '#062731',
            strokeWeight: 2,
            strokeColor: '#146474',
            fillOpacity: 2,
        });

        this.setState({ map: map });
        this.updateMarkers(map);

        map.data.addGeoJson(USAGeoData);
    }

    renderPolyline() {
        var path = [];
        for (let i = 0; i < this.props.polyline.length - 1; i++) {
            let obj = this.props.markers[this.props.polyline[i]];
            path.push({ lat: obj.latitude, lng: obj.longitude });
        }
        let obj = this.props.markers[0];
        path.push({ lat: obj.latitude, lng: obj.longitude });

        return (
            <Polyline
                path={path}
                strokeColor="#146474"
                strokeOpacity={0.8}
                strokeWeight={2}
            />
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.markers && prevProps.markers !== this.props.markers) {
            prevState.markers.forEach((m) => m.setMap(null));
            this.updateMarkers(this.state.map);
        }
    }

    onMarkerClick = (marker) =>
        this.setState({
            selectedMarker: marker,
            showingInfoWindow: true,
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                selectedMarker: {},
            });
        }
    };

    updateMarkers(map) {
        let markers = [];
        this.props.markers.forEach((team) => {
            let m = new this.marker({
                latlng: new this.props.google.maps.LatLng(
                    team.latitude,
                    team.longitude,
                ),
                callback: this.onMarkerClick.bind(this),
                map: map,
                name: team.team,
                markers: this.state.markers,
                google: this.props.google,
                html: `<div id="marker-container"><img id="marker" src=${team.logo}></div>`,
            });
            m.setMap(map);
            markers.push(m);
        });
        this.setState({ markers: markers });
    }

    render() {
        return (
            <Map
                onClick={this.onMapClicked}
                style={{ width: '50%', height: '80%' }}
                minZoom={3.9}
                google={this.props.google}
                initialCenter={{ lat: 37.0902, lng: -95.7132 }}
                zoom={3.9}
                onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
            >
                {this.renderPolyline()}
                <InfoWindow
                    marker={this.state.selectedMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div>{this.state.selectedMarker.name}</div>
                </InfoWindow>
            </Map>
        );
    }

    marker = class HTMLMapMarker extends this.props.google.maps.OverlayView {
        constructor(props) {
            super();
            this.google = props.google;
            this.latlng = props.latlng;
            this.html = props.html;
            this.callback = props.callback;
            this.name = props.name;
        }

        createDiv() {
            this.div = document.createElement('div');
            this.div.style.position = 'absolute';
            this.div.style.zIndex = '9999';
            if (this.html) {
                this.div.innerHTML = this.html;
            }
            this.google.maps.event.addDomListener(
                this.div,
                'click',
                (event) => {
                    this.callback(this);
                },
            );
        }

        appendDivToOverlay() {
            const panes = this.getPanes();
            panes.overlayMouseTarget.appendChild(this.div);
        }

        positionDiv() {
            const point = this.getProjection().fromLatLngToDivPixel(
                this.latlng,
            );
            if (point) {
                this.div.style.left = `${point.x - 20}px`;
                this.div.style.top = `${point.y - 20}px`;
            }
        }

        draw() {
            if (!this.div) {
                this.createDiv();
                this.appendDivToOverlay();
            }
            this.positionDiv();
        }

        remove() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                this.div = null;
            }
        }

        getPosition() {
            return this.latlng;
        }

        getDraggable() {
            return false;
        }
    };
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCvyC036oaVypkYK47rUpFhYc3dOf2qQ2U',
})(MapContainer);
