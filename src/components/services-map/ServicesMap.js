import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Geocode from "react-geocode";
import { withFirebase } from "../../config/firebase/context";
import styled from "styled-components";

const markers = [
  {
    name: "city1",
    position: { lat: 39.648209, lng: -75.711185 },
    label: "something"
  },
  {
    name: "city2",
    position: { lat: 40.648209, lng: -75.711185 },
    label: "something2"
  },
  {
    name: "city3",
    position: { lat: 40.648209, lng: -74.711185 },
    label: "something3"
  }
];

class ServicesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: true,
      activeMarker: {},
      selectedPlace: {}
    };
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentDidMount() {
    this.props.firebase.services().on("value", snapshot => {
      let services = [];
      console.log(snapshot.val());
      if (snapshot.val()) {
        Object.values(snapshot.val()).forEach(object => {
          services.push(object);
        });
      }
    });
  }

  onMarkerClick = (props, marker, e) => {
    console.log(marker);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  onMapClick = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false
        // activeMarker: null
      });
    }
  };
  render() {
    const style = {
      position: "absolute",
      width: "80vw",
      height: "75vh",
      marginLeft: "10px",
      marginRight: "10px"
    };

    Geocode.enableDebug();

    Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

    Geocode.fromAddress("Eiffel Tower").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );

    return (
      <div className={this.props.className}>
        <Map
          className="google-maps"
          item
          xs={12}
          style={style}
          google={this.props.google}
          onClick={this.onMapClick}
          zoom={6}
          initialCenter={{ lat: 52.237049, lng: 21.017532 }}
        >
          {markers.map(marker => (
            <Marker
              onClick={this.onMarkerClick}
              title={"Changing Colors Garage"}
              position={marker.position}
              name={marker.name}
              label={marker.label}
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <Paper>
              <Typography variant="headline" component="h4">
                {this.state.activeMarker.name}
              </Typography>
              <Typography component="p">
                {this.state.activeMarker.label}
              </Typography>
            </Paper>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

const StyledServiceMap = styled(ServicesMap)`
  .google-maps {
    width: 600px !important;
  }
`;

export default withFirebase(
  GoogleApiWrapper({
    api: process.env.GOOGLE_API_KEY_GOES_HERE
  })(StyledServiceMap)
);
