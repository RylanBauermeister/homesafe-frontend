import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
const BASE_URL = 'http://localhost:3000/api/v1/'

export default class COMPONENT_NAME extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  processFacebookResponse = (response) => {
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
    .then(console.log)
  }

  render(){
    return <div className="top-banner">
      <FacebookLogin
        appId="388891491837070"
        autoLoad={true}
        fields="name, picture"
        callback={this.processFacebookResponse}
      />
    </div>;
  }
}
