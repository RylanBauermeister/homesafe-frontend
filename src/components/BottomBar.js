import React, { Component } from 'react'
import WeightingForm from './WeightingForm'

export default class BottomBar extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return <div className="bottom-bar">
      <WeightingForm />
      <div className="directions"></div>
    </div>;
  }
}
