import React from 'react';
import { Map, GoogleApiWrapper, Polyline, InfoWindow } from 'google-maps-react';
import '../App';
import mapStyles from '../common/mapStyles.json';
import { USAGeoData } from '../data/USAGeoData.js';

export class MapContainer extends React.Component {
    // initialize component state
    state = {
        map: {},
        markers: [],
        selectedMarker: {},
        showingInfoWindow: false,
    };

    //called when the map is attached to the DOM
    _mapLoaded(mapProps, map) {
        // set the JSON mapstyles
        map.setOptions({
            styles: mapStyles,
        });

        // sets the style for the KML overlay
        map.data.setStyle({
            fillColor: '#062731',
            strokeWeight: 2,
            strokeColor: '#146474',
            fillOpacity: 2,
        });

        // saves the instance of the map for use in other methods
        this.setState({ map: map });

        // updates the markers with the instance of the map to set them to
        this.updateMarkers(map);

        // adds the KML data to render the bounds of the US
        map.data.addGeoJson(USAGeoData);
    }

    // called when the final solution is passed down and it is rendered on the map
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

    // if the dataset is updated or the HOC is refreshed, then the previous markers should be erased and new markers should be added
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.markers && prevProps.markers !== this.props.markers) {
            //erases previous markers
            prevState.markers.forEach((m) => m.setMap(null));

            //adds new markers
            this.updateMarkers(this.state.map);
        }
    }

    // shows the infowindow when a marker is clicked
    onMarkerClick = (marker) =>
        this.setState({
            selectedMarker: marker,
            showingInfoWindow: true,
        });

    // dismissed the infowindow when the map is clicked
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                selectedMarker: {},
            });
        }
    };

    // function that uses this.props.markers and renders a map marker for each of them
    updateMarkers(map) {
        let markers = [];
        this.props.markers.forEach((team) => {
            //call to custom marker class
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

            //adds it to the map
            m.setMap(map);
            markers.push(m);
        });

        // stores these markers for future usage
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

    // custom HTML node to render on the map. Code adapted from https://levelup.gitconnected.com/how-to-create-custom-html-markers-on-google-maps-9ff21be90e4b
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
