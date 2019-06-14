import React, { Component } from 'react'
import CrimeWeightSlider from '../components/CrimeWeightSlider'

class WeightingForm extends Component {
  render(){
    return <div className="user-options">
      <div className="options-container">
        <CrimeWeightSlider crimeType="crimesAgainstPersons" />
        <CrimeWeightSlider crimeType="crisisAndInjury" />
        <CrimeWeightSlider crimeType="drugsAndVice" />
        <CrimeWeightSlider crimeType="miscCrimes" />
        <CrimeWeightSlider crimeType="propertyCrime" />
        <CrimeWeightSlider crimeType="trafficCrime" />
      </div>
    </div>;
  }
}

export default WeightingForm
