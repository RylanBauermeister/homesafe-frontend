import React from 'react';
import './App.css';
import Banner from './components/Banner.js'
import BottomBar from './components/BottomBar.js'
import {set_map} from './actions/users.js'
import {connect} from 'react-redux'
import MapComponent from './components/MapComponent'

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
        <MapComponent />
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
