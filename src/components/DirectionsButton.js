import React, { Component } from 'react'
import {Modal, Button, Header, Icon} from 'semantic-ui-react'
import DirectionsForm from '../containers/DirectionsForm'
import {connect} from 'react-redux'

class DirectionsButton extends Component {


  constructor(props){
    super(props)
    this.state = { modalOpen: false }
  }


  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {this.setState({ modalOpen: false })}

  getButtonToRender(){
    return <Button color="green" onClick={this.handleOpen}>
      <Icon name="road"/>
      <div>Get Directions</div>
    </Button>
  }

  render(){
    return (
        <Modal
          trigger={this.getButtonToRender()}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size='small'
          transition={{animation: "fade up", duration: 500}}
          closeIcon
        >
          <Header icon='road' content='Get Directions' />
          <Modal.Content>
            <h3>Map Walking Directions</h3>
            <DirectionsForm modalCloser={this.handleClose}/>
          </Modal.Content>
        </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    windowSize: state.windowSize
  }
}

export default connect(mapStateToProps)(DirectionsButton)
