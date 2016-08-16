import React from 'react';

import IconButton from 'material-ui/IconButton';

import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';

import { inlineIconStyle } from './Helpers';

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
        onClick={onClickDo} >
        <NavigationCancel />
      </IconButton>
    );
  }

  return (
    <div style={{display: 'none'}}></div>
  );
}

CancelButton.propTypes = {
  onClickDo: React.PropTypes.func.isRequired,
  last: React.PropTypes.bool.isRequired
}

export default CancelButton;