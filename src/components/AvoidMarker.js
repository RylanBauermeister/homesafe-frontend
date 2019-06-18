import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Header, Icon} from 'semantic-ui-react'
import {Marker} from "react-google-maps"
import {setAvoids} from "../actions/avoids"


class AvoidMarker extends Component {

  constructor(props){
    super(props)
    this.state = { modalOpen: false }

    this.deleteAvoid = this.deleteAvoid.bind(this)
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  deleteAvoid() {
    fetch("http://localhost:3000/api/v1/avoids/"+this.props.avoid.id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        signature: this.props.signature
      })
    })
    .then(res => res.json())
    .then(avoids => {
      this.handleClose()
      this.props.setAvoids(avoids)
    })
  }

  render(){
    return <div>
      <Modal
        trigger={<Marker icon="avoid_marker.png" position={{lat: this.props.avoid.lat, lng: this.props.avoid.lng}} onClick={this.handleOpen}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'
        closeIcon
      >
        <Header icon='warning sign' content={`User Avoid`} />
        <Modal.Content>
          <div>
            {this.props.avoid.notes}
          </div>
        </Modal.Content>
        <Modal.Actions>
          {this.props.user && this.props.user.id === this.props.avoid.user_id && <Button negative onClick={this.deleteAvoid} content="Delete This Avoid"/>}
        </Modal.Actions>
      </Modal>

    </div>;
  }

}

const mapStateToProps = state => {
  return {
    signature: state.signature,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAvoids: avoids => dispatch(setAvoids(avoids))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvoidMarker)
