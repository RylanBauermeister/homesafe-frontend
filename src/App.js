import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from 'google-map-react'
import Banner from './components/Banner.js'
import BottomBar from './components/BottomBar.js'
import {set_map} from './actions/users.js'
import {connect} from 'react-redux'
import {google_api_key} from './secrets'

class App extends React.Component {

  constructor(props){
    super(props)

    this.loadCrimes();
  }

  loadCrimes(){
    fetch('http://localhost:3000/api/v1/crimes')
    .then(res => res.json())
    .then(crimes => {
      this.props.set_heatmap(crimes);
      window.crimes = crimes;
    })
  }

  render() {
    return (
      <div className="App">
        <Banner />
        <div className="map-container">
          <GoogleMap bootstrapURLKeys={{key: google_api_key}}
                     defaultZoom={13}
                     yesIWantToUseGoogleMapApiInternals
                     defaultCenter={{lat: 47.6129432, lng: -122.4821475}}
                     heatmapLibrary={true}
                     heatmap={this.props.heatmap}
                     >
            <div lat={47.6129432} lng={-122.4821475}>
              {this.props.changing_message}
            </div>

            {/* {this.props.heatmap.positions.map(crime => <div lat={crime.lat} lng={crime.lng}>DANGER</div>)} */}
          </GoogleMap>
        </div>
        <BottomBar />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    heatmap: state.heatmap,
    changing_message: state.changing_message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_heatmap: map => dispatch(set_map(map))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
