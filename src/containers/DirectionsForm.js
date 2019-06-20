import React, { Component } from 'react'
import {set_directions} from '../actions/users'
import {connect} from 'react-redux'

class DirectionsForm extends Component {

  constructor(props){
    super(props)
    this.state = {

    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev){
    ev.preventDefault();
    if(this.props.modalCloser){
      this.props.modalCloser();
    }
    const addresses = {start: this.urlify(ev.target.elements["start"].value),
                end: this.urlify(ev.target.elements["end"].value)
              }
    this.getLatLngAddresses(addresses);
  }

  getLatLngAddresses(addresses){
    this.parseAddress(addresses.start)
    .then(data => {
      if(data.status !== "ZERO_RESULTS"){
        let coords = data.results[0].geometry.location
        addresses.start = new window.google.maps.LatLng(coords.lat, coords.lng)
        this.parseAddress(addresses.end)
        .then(data => {
          if(data.status !== "ZERO_RESULTS"){
            let coords = data.results[0].geometry.location
            addresses.end = new window.google.maps.LatLng(coords.lat, coords.lng)
            this.getDirections(addresses)
          }
        })
      }
    })
  }

  parseAddress(address){
    return fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyA5tbFM5k4j2MOPGTBB0kuCBQI9UIhpX3U")
    .then(res => res.json())
  }

  getDirections(addresses){
    const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route({
        origin: addresses.start,
        destination: addresses.end,
        travelMode: window.google.maps.TravelMode.WALKING

      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.props.set_directions(result)
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
  }


  urlify(address){
    return address.replace(" ", "+")+"+seattle+wa"
  }

  render(){
    return <div className="directions-form">
        <form onSubmit={this.handleSubmit} className="ui form directions-ui">
          <div className="two fields">
            <div className="field">
              <input className="ui field" name="start" type="text" placeholder="Starting Address..."/>
            </div>
            <div className="field">
              <input className="ui field" name="end" type="text" placeholder="Ending Address..."/>
            </div>
          </div>
          <div>

          </div>
          <input type="submit" className="ui submit button" value="Get Me There"/>
        </form>
      </div>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_directions: directions => dispatch(set_directions(directions))
  }
}

export default connect(null, mapDispatchToProps)(DirectionsForm)
