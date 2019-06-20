import React, { Component } from 'react'
import CrimeWeightSlider from '../components/CrimeWeightSlider'
import {connect} from 'react-redux'


function sliders(weights) {
  let result = [];
  for(let key in weights){
    result.push(<CrimeWeightSlider key={key} crimeType={key}/>)
  }

  return result;
}

class WeightingForm extends Component {
  render(){
    return <div className="user-options">
      <div className="options-container">
        {sliders(this.props.crimeWeights)}
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    crimeWeights: state.crimeWeights
  }
}

export default connect(mapStateToProps)(WeightingForm)
