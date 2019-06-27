import React, { Component } from 'react'
import {Modal, Button, Header, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addAvoid} from '../actions/avoids'

class NewAvoidButton extends Component {


  constructor(props){
    super(props)
    this.state = {
      modalOpen: false
    }
    this.avoidForm = React.createRef()
  }


  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = (confirm = false) => {
    //Need strict boolean equals to confirm that this isn't coming in as a mouse event
    // (i.e. confirm it was sent from the confirm button)
    if(confirm === true){
      const newAvoid = {
        address: this.avoidForm.current.elements["address"].value,
        notes: this.avoidForm.current.elements["notes"].value
      }

      fetch("https://homesafeapi.com/api/v1/avoids", {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          avoid: newAvoid,
          user_id: this.props.user.id,
          signature: this.props.signature
        })
      })
      .then(res => res.json())
      .then(avoid => {
        this.props.addAvoid(avoid)
      })
    }

    this.setState({ modalOpen: false })
  }

  getButtonToRender(){
    if(this.props.windowSize.width <= 475){
      return <Button color="orange" onClick={this.handleOpen}>
        <Icon name="ban"/>
      </Button>
    } else {
      return <Button color="orange" icon="ban" content="New Avoid" onClick={this.handleOpen}/>
    }
  }

  render(){
    return (
      <Modal
        trigger={this.getButtonToRender()}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'
        closeIcon
      >
        <Header icon='ban' content='Create New Avoid' />
        <Modal.Content>
          <h3>Have a place you personally don't like going? Skip it.</h3>
          <form ref={this.avoidForm} className="ui form">
            <div className="field">
              <label>Address To Avoid</label>
              <input type="text" name="address" className="ui field" placeholder="address"/>
            </div>
            <div className="field">
              <label>Notes</label>
              <textarea name="notes" className="ui field" placeholder="Notes"/>
            </div>


          </form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => this.handleClose(true)}>
            <Icon name='checkmark' /> Create
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    signature: state.signature,
    windowSize: state.windowSize
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAvoid: avoid => dispatch(addAvoid(avoid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAvoidButton)
