import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map, Typography } from 'google-maps-react';
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";

import CurrentLocation from './Components/Map';

import "./App.css"

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.fetchNearbyPlaces = this.fetchNearbyPlaces.bind(this);
  }

  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
    apidata: {}
  };

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  fetchNearbyPlaces(){
    // const proxy_url = 'https://cors-anywhere.herokuapp.com/';
    // const proxy_url = "http://cors.now.sh/"

    var places = [] // List of places    
    console.log(this.state.apidata);
    console.log(this.state.apidata.length);
    for(let googlePlace in this.state.apidata.results) {
      console.log("yeet")
      var place = {}
      var lat = googlePlace.geometry.location.lat;
      var lng = googlePlace.geometry.location.lng;
      var coordinate = {
        latitude: lat,
        longitude: lng,
      }

      place['placeTypes'] = googlePlace.types
      place['coordinate'] = coordinate
      place['placeId'] = googlePlace.place_id
      place['placeName'] = googlePlace.name

      places.push(place);
    }
    // Do your work here with places Array
  }

  componentDidUpdate() {
    let my_lat = 0;
    let my_lng = 0;
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      my_lat = position.coords.latitude;
      my_lng = position.coords.longitude;
    });
    const rad = 1000;
    const type = "hospital";
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + my_lat + "," + my_lng + "&radius=" + rad + "&type=" + type + "&key=";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          apidata: data 
        });
      });
    this.fetchNearbyPlaces();
  }

  render() {
    return (
      <div>
      <Grid container justify="center">
        <Grid item xs={12} spacing={3} className="spacer"></Grid>
        <Grid item xs={6}>
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
          >
            <Marker onClick={this.onMarkerClick} name={'Current Location'} />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </CurrentLocation>
        </Grid>
        <Grid item xs={3}>
          <List component="nav">
            <ListItem>
              <h1>Nearby Medical Centers</h1>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Mercy General Hospital" secondary="4001 J St, Sacramento, CA 95819"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Sutter Medical Center" secondary="1020 29th St, Sacramento, CA 95816"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Woodland Memorial Hospital" secondary="1325 Cottonwood St, Woodland, CA 95695"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Sutter Davis Hospital" secondary="2000 Sutter Pl, Davis, CA 95616"/>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer);
