/**
 * NoteHeader component used for showing the type of the Note.
 * @copyright Juan Cabello
 * @license GPLv3
 */
import React from 'react';

import { titleArea } from '../../helpers/Helpers';

const NoteHeader = ({
  show,
  title
}) => {
  return (
    <div className="row">
      <h3
        className="small-12"
        style={show ? titleArea.visible : titleArea.hidden }
        >
        {title}
      </h3>
    </div>
  );
};

NoteHeader.propTypes = {
  show: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired
};

export default NoteHeader;
