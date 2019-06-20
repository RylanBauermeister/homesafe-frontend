import React from 'react';
import './App.css';
import Banner from './components/Banner.js'
import BottomBar from './components/BottomBar.js'
import {set_map, set_window_size} from './actions/users.js'
import {setReports} from './actions/reports.js'
import {connect} from 'react-redux'
import MapComponent from './components/MapComponent'

class App extends React.Component {

  constructor(props){
    super(props)

    this.loadReports();
    this.loadCrimes();
    window.addEventListener('resize', this.props.updateWindowSize)
  }

  loadCrimes(){
    fetch('http://homesafebackend-env.pqjmvw5jnc.us-west-2.elasticbeanstalk.com/api/v1/crimes')
    .then(res => res.json())
    .then(crimes => {
      this.props.set_heatmap(crimes);
    })
  }

  loadReports(){
    fetch('http://homesafebackend-env.pqjmvw5jnc.us-west-2.elasticbeanstalk.com/api/v1/reports')
    .then(res => res.json())
    .then(reports => {
      this.props.setReports(reports)
    })
  }

  render() {
    return (
      <div className="App">
        <Banner />
        <div className="map-container">
          <MapComponent />
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
    set_heatmap: map => dispatch(set_map(map)),
    setReports: reports => dispatch(setReports(reports)),
    updateWindowSize: () => dispatch(set_window_size())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
