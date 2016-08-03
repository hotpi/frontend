import React from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import ToggleStar from 'material-ui/svg-icons/toggle/star';

import { 
  amber700,
  amber400,
  amber100 
} from 'material-ui/styles/colors'

import { iconStyles } from './NoteLine'

export const ImportantIcon = ({
  onChangeDo,
  value
}) => {
  return (
    <IconMenu
      onChange={onChangeDo}
      value={value}
      iconButtonElement={(
        <IconButton
          tooltip="Set as important"
          tooltipPosition="top-right"
          className="line-buttons"
          style={iconStyles.iconArea}
          iconStyle={iconStyles.icon}>
            <ToggleStar />
        </IconButton>
      )}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}>
        <MenuItem value="0" primaryText="Normal priority" />
        <MenuItem value="1" leftIcon={<ToggleStar color={amber700}/>} primaryText="Priority 1" />
        <MenuItem value="2" leftIcon={<ToggleStar color={amber400}/>} primaryText="Priority 2" />
        <MenuItem value="3" leftIcon={<ToggleStar color={amber100}/>} primaryText="Priority 3" />
    </IconMenu>
  );
}