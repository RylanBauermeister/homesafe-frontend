import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Header, Icon} from 'semantic-ui-react'
import {Marker} from "react-google-maps"
import {setReports} from "../actions/reports"
import LikeButton from "./LikeButton"


class ReportMarker extends Component {

  constructor(props){
    super(props)
    this.state = {
      modalOpen: false
    }
    this.deleteReport = this.deleteReport.bind(this)
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  deleteReport() {
    fetch("http://localhost:3000/api/v1/reports/"+this.props.report.id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        signature: this.props.signature
      })
    })
    .then(res => res.json())
    .then(reports => {
      this.handleClose()
      this.props.setReports(reports)
    })
  }

  render(){
    return <div>
      <Modal
        trigger={<Marker icon="report_marker_white.png" position={{lat: this.props.report.lat, lng: this.props.report.lng}} onClick={this.handleOpen}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'
        closeIcon
      >
        <Header icon='warning sign' content={`User Report`} />
        <Modal.Content>
          <div>
            {this.props.report.notes}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <LikeButton report={this.props.report}/>
          {this.props.user && this.props.user.id === this.props.report.user.id && <Button negative onClick={this.deleteReport} content="Delete This Report"/>}
        </Modal.Actions>
      </Modal>

    </div>;
  }

}

const mapStateToProps = state => {
  return {
    signature: state.signature,
    user: state.user,
    reports: state.reports
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setReports: reports => dispatch(setReports(reports))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportMarker)
