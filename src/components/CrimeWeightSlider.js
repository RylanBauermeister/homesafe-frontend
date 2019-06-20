import React from 'react'
import { Slider } from "react-semantic-ui-range";
import {connect} from 'react-redux'
import {adjust_weight, set_user} from '../actions/users'

class CrimeWeightSlider extends React.Component {

  constructor(props){
    super(props)

    this.sliderRef = React.createRef()
  }

  updateWeight(weight){
    fetch("http://homesafebackend-env.pqjmvw5jnc.us-west-2.elasticbeanstalk.com/api/v1/users/"+this.props.user.id, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        signature: this.props.signature,
        crime_weights: {...this.props.weights, [this.props.crimeType]: weight}
      })
    })
    .then(res => res.json())
    .then(user => {
      this.props.adjust_weight(this.props.crimeType, weight)
      this.props.set_user(user)
    })
  }

  render(){
    return (
      <div className="crime-weight-slider">
        <div className="slider-label">
          {this.props.crimeType}
        </div>
          <div className="slider-bar">
            <Slider ref={this.sliderRef}
              color="red"
              inverted={true}
              settings={{
                start: this.props.weights[this.props.crimeType],
                min: 0,
                max: 100,
                step: 1,
                onChange: value => {
                  this.updateWeight(value)
                }
              }}
            />
          </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    weights: state.crimeWeights,
    signature: state.signature,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    adjust_weight: (crimeType, weight) => dispatch(adjust_weight(crimeType, weight)),
    set_user: (user) => dispatch(set_user(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeWeightSlider);
