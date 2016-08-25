import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import { newNoteButtonStyle } from '../../helpers/Helpers';

import { getFirstPatientId } from '../../../reducers';

const NewNoteButton = ({
  patientId,
  onClickDo
}) => {
  return (
    <FloatingActionButton onTouchTap={onClickDo} style={newNoteButtonStyle}>
      <ContentAdd />
    </FloatingActionButton>
  );
}

const mapStateToProps = (state, { params }) => {
  const patientId = params.patientId || getFirstPatientId(state)
  
  return {
    patientId
  };
}

export default withRouter(connect(mapStateToProps)(NewNoteButton));