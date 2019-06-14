import React, { Component } from 'react'
import WeightingForm from '../containers/WeightingForm'
import DirectionsForm from '../containers/DirectionsForm'
import {connect} from 'react-redux'

class BottomBar extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return <div className="bottom-bar">
      {this.props.user && <WeightingForm />}
      <DirectionsForm />
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(BottomBar)
