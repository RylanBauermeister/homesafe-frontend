import React, { Component } from 'react'
import {Modal, Button, Header, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addReport} from '../actions/reports'

class NewReportButton extends Component {


  constructor(props){
    super(props)
    this.state = { modalOpen: false }

    this.reportForm = React.createRef()
  }


  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = (confirm = false) => {
    //Need strict boolean equals to confirm that this isn't coming in as a mouse event
    // (i.e. confirm it was sent from the confirm button)
    if(confirm === true){
      const newReport = {
        address: this.reportForm.current.elements["address"].value,
        notes: this.reportForm.current.elements["notes"].value
      }

      fetch("http://localhost:3000/api/v1/reports", {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          report: newReport,
          user_id: this.props.user.id,
          signature: this.props.signature
        })
      })
      .then(res => res.json())
      .then(report => {
        this.props.addReport(report)
      })
    }

    this.setState({ modalOpen: false })
  }

  render(){
    return (
      <Modal
        trigger={<Button basic negative onClick={this.handleOpen}>New Report</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'
      >
        <Header icon='warning sign' content='Create New Report' />
        <Modal.Content>
          <h3>Think a safe route is no good? Report it!</h3>
          <form ref={this.reportForm} className="ui form">
            <div className="field">
              <label>Address To Report</label>
              <input type="text" name="address" className="ui field" placeholder="address"/>
            </div>
            <div className="field">
              <label>Notes</label>
              <textarea name="notes" className="ui field" placeholder="Notes"/>
            </div>


          </form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => this.handleClose(true)} inverted>
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
    signature: state.signature
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReport: report => dispatch(addReport(report))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReportButton)
