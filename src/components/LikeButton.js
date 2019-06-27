import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Icon, Label } from 'semantic-ui-react'
import {updateLikes} from '../actions/reports'

class LikeButton extends Component {

  constructor(props){
    super(props)
    this.state = {
      liked: this.props.report.likes.some(like => props.user.id === like.user_id)
    }
    this.likeReport = this.likeReport.bind(this)
    this.unlikeReport = this.unlikeReport.bind(this)
  }

  static getDerivedStateFromProps(props, state){
    return {
      liked: props.report.likes.some(like => props.user.id === like.user_id)
    }
  }

  likeReport(){
    fetch(`https://homesafeapi.com/api/v1/reports/${this.props.report.id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        signature: this.props.signature,
        user_id: this.props.user.id
      })
    })
    .then(res => res.json())
    .then(data => this.props.updateLikes(this.props.report, data.likes))
  }

  unlikeReport(){
    fetch(`https://homesafeapi.com/api/v1/reports/${this.props.report.id}/unlike`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        signature: this.props.signature,
        user_id: this.props.user.id
      })
    })
    .then(res => res.json())
    .then(data => this.props.updateLikes(this.props.report, data.likes))
  }

  render(){
    return  <Button as='div' labelPosition='right'>
      <Button color={this.state.liked ? 'blue' : 'purple'}
              onClick={this.state.liked ? this.unlikeReport : this.likeReport}>
        <Icon name='heart' />
        {this.state.liked ? "Liked!" : "Like"}
      </Button>
      <Label as='a' basic color={this.state.liked ? 'blue' : 'purple'} pointing='left'>
        {this.props.report.likes.length}
      </Label>
    </Button>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    signature: state.signature,
    reports: state.reports
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateLikes: (report, likes) => dispatch(updateLikes(report, likes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
