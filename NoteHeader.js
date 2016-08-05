import React from 'react';

import { titleArea } from './Helpers'

const NoteHeader = ({
  show,
  title
}) => {
  return (
    <h3 style={show ? titleArea.visible : titleArea.hidden }>
      {title}
    </h3>
  );
}

export default NoteHeader;