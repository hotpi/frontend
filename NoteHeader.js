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

NoteHeader.propTypes = {
  show: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired
}

export default NoteHeader;