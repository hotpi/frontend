/**
 * NewNoteButton component which holds the button component used to create a new note.
 *
 * @copyright Juan Cabello
 * @license GPLv3
 */

import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { newNoteButtonStyle } from '../../helpers/Helpers';

class NewNoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ width: nextProps.width });
  }

  render() {
    const { onClickDo } = this.props;
    return (
      <FloatingActionButton
        onTouchTap={onClickDo}
        style={{
          ...newNoteButtonStyle,
          left: this.state.width - 90
        }}
      >
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

NewNoteButton.propTypes = {
  patientId: React.PropTypes.string,
  onClickDo: React.PropTypes.func,
  width: React.PropTypes.number
};

export default NewNoteButton;
