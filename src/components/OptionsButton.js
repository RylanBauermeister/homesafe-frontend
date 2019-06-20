import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Header} from 'semantic-ui-react'
import {toggleAvoidDisplay} from '../actions/avoids'
import {toggleReportDisplay} from '../actions/reports'
import WeightingForm from '../containers/WeightingForm'

class OptionsButton extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(ev) {

  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  render(){
      return <Modal
          trigger={<Button icon="options" color="blue" content="Options" onClick={this.handleOpen}/>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size='small'
          basic
          closeIcon
        >
          <Header icon='options' content={`Options`} />
          <Modal.Content>
            <form className="ui form">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="show-reports" onChange={this.props.toggleReportDisplay} checked={this.props.showReports}/>
                <label ref={element => {
                      if (element) element.style.setProperty('color', 'white', 'important');
                    }}
                    >Show User Generated Reports</label>
              </div>
              <div className="ui toggle checkbox">
                <input type="checkbox" name="show-avoids" onChange={this.props.toggleAvoidDisplay} checked={this.props.showAvoids}/>
                <label ref={element => {
                          if (element) element.style.setProperty('color', 'white', 'important');
                        }}
                        >Show Your Avoided Locations</label>
              </div>
            </form>
            <WeightingForm />
          </Modal.Content>
          <Modal.Actions>

          </Modal.Actions>
        </Modal>
;
  }
}

const mapStateToProps = state => {
  return {
    showAvoids: state.showAvoids,
    showReports: state.showReports
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAvoidDisplay: () => dispatch(toggleAvoidDisplay()),
    toggleReportDisplay: () => dispatch(toggleReportDisplay())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsButton)
