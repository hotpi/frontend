import React from 'react';

import { titleArea } from './Helpers'

const NoteHeader = ({
  noteLines,
  hasFocus,
  type,
  title
}) => {
  return (
    <h3 style={noteLines > 1 || hasFocus || type !== "New" ? titleArea.visible : titleArea.hidden }>{title}</h3>
  );
}

export default NoteHeader;