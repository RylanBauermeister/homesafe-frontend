import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import ButtonBarRight from '../containers/ButtonBarRight'
import {connect} from 'react-redux'
import {set_user, set_signature, set_weights} from '../actions/users'
import {setAvoids} from '../actions/avoids'
import {Logo} from './Logo'

const BASE_URL = 'https://homesafeapi.com/api/v1/'

class Banner extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  processFacebookResponse = (response) => {
    this.props.setSignature(response.signedRequest)
    fetch(BASE_URL+'my_profile', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        signature: response.signedRequest,
        user: {
          username: response.name,
          foreign_id: response.id
        }
      })
    })
    .then(res => res.json())
    .then(user => {
      this.props.setWeights(user.crime_weights)
      this.props.setAvoids(user.avoids)
      this.props.setUser(user)
    })
  }

  render(){
    return <div className="top-banner">
      <Logo />
      {this.props.signature !== "" && <ButtonBarRight />}
      {this.props.signature === "" && <FacebookLogin
        appId="388891491837070"
        autoLoad={true}
        fields="name, picture"
        callback={this.processFacebookResponse}
      />}
    </div>;
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    signature: state.signature
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(set_user(user)),
    setSignature: (sig) => dispatch(set_signature(sig)),
    setWeights: (weights) => dispatch(set_weights(weights)),
    setAvoids: (avoids) => dispatch(setAvoids(avoids))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
