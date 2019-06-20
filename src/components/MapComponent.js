import React from 'react'
import { compose, withProps } from "recompose";
import ReportMarker from './ReportMarker'
import AvoidMarker from './AvoidMarker'
import {connect} from 'react-redux'
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA5tbFM5k4j2MOPGTBB0kuCBQI9UIhpX3U&v=3.exp&libraries=geometry,drawing,places,visualization",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `80vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
    <GoogleMap defaultZoom={14} defaultCenter={{lat: 47.6129432, lng: -122.3521475}}>
      <DirectionsRenderer directions={props.directions} defaultOptions={{draggable: true}} options={{draggable: true}} />
      <HeatmapLayer data={props.heatmap.positions} options={{radius: 100, opacity: .75, maxIntesity: 100, dissipating:true}} />
      {props.reports && props.showReports && props.reports.map(report => <ReportMarker key={`report-${report.id}`} report={report}/>)}
      {props.avoids && props.showAvoids && props.avoids.map(avoid => <AvoidMarker key={`avoid-${avoid.id}`} avoid={avoid}/>)}
    </GoogleMap>
));

const mapStateToProps = state => {
  return {
    heatmap: state.heatmap,
    crimeWeights: state.crimeWeights,
    directions: state.directions,
    changing_message: state.changing_message,
    reports: state.reports,
    showReports: state.showReports,
    avoids: state.avoids,
    showAvoids: state.showAvoids
  }
}

export default connect(mapStateToProps)(MapComponent)
