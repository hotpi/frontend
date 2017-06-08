/**
 * EmergencyCallButton component which displays a modal with the emergency numbers.
 *
 * @copyright Juan Cabello
 * @license GPLv3
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';

import CommunicationPhone from 'material-ui/svg-icons/communication/phone';

import { getWidth } from '../../../reducers';

class EmergencyCallButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <FloatingActionButton
          backgroundColor="#c83030"
          onTouchTap={this.handleOpen.bind(this)}
          style={{
            position: 'fixed',
            left: this.props.width - 80,
            top: 20
          }}
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

EmergencyCallButton.propTypes = {
  width: PropTypes.number
};

const mapStateToProps = (state) => {
  const width = getWidth(state);
 
  return {
    width
  };
};

export default connect(mapStateToProps, null)(EmergencyCallButton);
