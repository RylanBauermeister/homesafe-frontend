import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import NewAvoidButton from '../components/NewAvoidButton'
import NewReportButton from '../components/NewReportButton'
import OptionsButton from '../components/OptionsButton'

export default class ButtonBarRight extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return <div className="right-buttons">
      <Button.Group>
        <NewAvoidButton />
        <NewReportButton />
        <OptionsButton />
      </Button.Group>
    </div>;
  }
}
