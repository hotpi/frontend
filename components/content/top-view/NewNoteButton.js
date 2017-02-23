import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import { newNoteButtonStyle } from '../../helpers/Helpers';

import { getFirstPatientId } from '../../../reducers';

class NewNoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ width: nextProps.width });
  }

  render() {
    const { patientId, onClickDo } = this.props
    return (
      <FloatingActionButton onTouchTap={onClickDo} style={{...newNoteButtonStyle, left: this.state.width - 90}}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

const mapStateToProps = (state, { params }) => {
  const patientId = params.patientId || getFirstPatientId(state)
  
  return {
    patientId
  };
}

export default withRouter(connect(mapStateToProps)(NewNoteButton));