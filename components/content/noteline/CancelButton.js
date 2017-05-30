/**
 * CancelButton component which shows the delete icon at the right of each
 * noteline.
 *
 * @copyright Juan Cabello
 * @license GPLv3
 * @todo Change React.PropTypes to just Component and PropTypes
 */

import React from 'react';

import IconButton from 'material-ui/IconButton';

import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';

import { inlineIconStyle } from '../../helpers/Helpers';

const CancelButton = ({
  onClickDo,
  last
}) => {
  if (!last) {
    return (
      <IconButton
        tooltip="Delete line"
        className="line-buttons"
        style={inlineIconStyle.iconArea}
        iconStyle={inlineIconStyle.icon}
        onTouchTap={onClickDo} >
        <NavigationCancel />
      </IconButton>
    );
  }

  return (
    <div style={{
      display: 'none'
    }}
    />
  );
};

CancelButton.propTypes = {
  onClickDo: React.PropTypes.func.isRequired,
  last: React.PropTypes.bool.isRequired
};

export default CancelButton;
