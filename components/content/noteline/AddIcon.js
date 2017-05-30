/**
 * AddIcon component which shows the plus icon on the last note's
 * notelines.
 *
 * @copyright Juan Cabello
 * @license GPLv3
 * @todo Change React.PropTypes to just Component and PropTypes
 */

import React from 'react';

import ContentAdd from 'material-ui/svg-icons/content/add';

const AddIcon = ({ last }) => {
  if (last) {
    return (
      <ContentAdd style={{
        left: 5,
        height: 18,
        width: 18,
        color: 'grey',
        paddingTop: 8,
        paddingRight: 2,
        marginRight: 5,
        marginLeft: 5
      }}
      />
    );
  }

  return (
    <div style={{
      display: 'none'
    }}
    />
  );
};

AddIcon.propTypes = {
  last: React.PropTypes.bool.isRequired
};

export default AddIcon;
