import React from 'react'
import { Slider } from "react-semantic-ui-range";
import {connect} from 'react-redux'
import {adjust_weight} from '../actions/users'

const CrimeWeightSlider = props => {
    return (
      <div className="crime-weight-slider">
        <div className="slider-label">
          {props.crimeType}
        </div>
          <div className="slider-bar">
            <Slider
              color="red"
              inverted={true}
              settings={{
                start: props.weights[props.crimeType],
                min: 0,
                max: 100,
                step: 1,
                onChange: value => {
                  props.adjust_weight(props.crimeType, value)
                }
              }}
            />
          </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(CrimeWeightSlider);
