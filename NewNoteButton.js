import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import { newNoteButtonStyle } from './Helpers'

const NewNoteButton = () => {
  return (
    <Link to="/patient/1/New">
      <FloatingActionButton style={newNoteButtonStyle}>
        <ContentAdd />
      </FloatingActionButton>
    </Link>
  );
}

export default NewNoteButton;