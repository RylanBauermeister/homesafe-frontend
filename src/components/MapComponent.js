import React, { Component } from 'react'
import { compose, withProps } from "recompose";
import {google_api_key} from '../secrets'
import {connect} from 'react-redux'
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key="+ google_api_key +"&v=3.exp&libraries=geometry,drawing,places,visualization",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `90vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={12} defaultCenter={{lat: 47.6129432, lng: -122.3521475}}>
    <HeatmapLayer data={props.heatmap.positions} options={{radius: 100, opacity: .75, maxIntesity: 100, dissipating:true}} />
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
));

const mapStateToProps = state => {
  return {
    heatmap: state.heatmap,
    crimeWeights: state.crimeWeights,
    changing_message: state.changing_message
  }
}

export default connect(mapStateToProps)(MapComponent)
