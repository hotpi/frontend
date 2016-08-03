import React from 'react';

import IconButton from 'material-ui/IconButton';

import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';

import { inlineIconStyle } from './NoteLine'

export const CancelButton = ({
  deleteLine,
  last
}) => {
  if (!last) {
    return (
      <IconButton
        tooltip="Delete line"
        className="line-buttons"
        style={inlineIconStyle.iconArea} 
        iconStyle={inlineIconStyle.icon} 
        onClick={deleteLine} >
        <NavigationCancel />
      </IconButton>
    )
  }

  return (
    <div style={{display: 'none'}}></div>
  );
}