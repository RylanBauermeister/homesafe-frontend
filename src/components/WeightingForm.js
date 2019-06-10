import React, { Component } from 'react'
import { Slider } from "react-semantic-ui-range";
import {connect} from 'react-redux'
import {adjust_weight} from '../actions/users'

class WeightingForm extends Component {



  render(){
    return <div className="user-options">
      <div className="options-container">
        <div className="crime-weight-slider">
          <Slider
            color="red"
            inverted={true}
            settings={{
              start: 0,
              min: 0,
              max: 100,
              step: 1,
              onChange: value => {
                this.props.adjust_weight('crimesAgainstPersons', value)
              }
            }}
          />

        </div>
        <div className="crime-weight-slider">
          <Slider
            color="red"
            inverted={true}
            settings={{
              start: 0,
              min: 0,
              max: 100,
              step: 1,
              onChange: value => {
                this.props.adjust_weight('crisisAndInjury', value)
              }
            }}
          />

        </div>
        <div className="crime-weight-slider">
          <Slider
            color="red"
            inverted={true}
            settings={{
              start: 0,
              min: 0,
              max: 100,
              step: 1,
              onChange: value => {
                this.props.adjust_weight('drugsAndVice', value)
              }
            }}
          />

        </div>
        <div className="crime-weight-slider">
          <Slider
            color="red"
            inverted={true}
            settings={{
              start: 0,
              min: 0,
              max: 100,
              step: 1,
              onChange: value => {
                this.props.adjust_weight('miscCrimes', value)
              }
            }}
          />

        </div>
        <div className="crime-weight-slider">
          <Slider
            color="red"
            inverted={true}
            settings={{
              start: 0,
              min: 0,
              max: 100,
              step: 1,
              onChange: value => {
                this.props.adjust_weight('propertyCrime', value)
              }
            }}
          />

        </div>
        <div className="crime-weight-slider">
          <Slider
            color="red"
            inverted={true}
            settings={{
              start: 0,
              min: 0,
              max: 100,
              step: 1,
              onChange: value => {
                this.props.adjust_weight('trafficCrime', value)
              }
            }}
          />

        </div>

      </div>


    </div>;
  }
}

const mapStateToProps = state => {
  return {
    weights: state.crimeWeights
  }
}
const mapDispatchToProps = dispatch => {
  return {
    adjust_weight: (crimeType, weight) => dispatch(adjust_weight(crimeType, weight))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeightingForm)
