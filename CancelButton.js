import React from 'react';

import IconButton from 'material-ui/IconButton';

import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';

import { inlineIconStyle } from './Helpers'

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
    )
  }

  return (
    <div style={{display: 'none'}}></div>
  );
}

export default CancelButton;