import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton'; 
import Dialog from 'material-ui/Dialog';

import CommunicationPhone from 'material-ui/svg-icons/communication/phone';

import {
  red800
} from 'material-ui/styles/colors';

class EmergencyCallButton extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  render() {
    return (
      <div>
        <FloatingActionButton 
          backgroundColor="#c83030" 
          onTouchTap={this.handleOpen.bind(this)}
          style={{position: 'fixed', left: '90%', top: 20}} 
          >
          <CommunicationPhone />
        </FloatingActionButton>
        <Dialog
          title="Emergency numbers"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          Emergency number: 333-4234123
        </Dialog>
      </div>
    );
  }
}

export default EmergencyCallButton;