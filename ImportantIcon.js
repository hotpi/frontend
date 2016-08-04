import React from 'react';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import ToggleStar from 'material-ui/svg-icons/toggle/star';

import { 
  amber700,
  amber400,
  amber100 
} from 'material-ui/styles/colors'

import { iconStyles } from './Helpers'


export const ImportantIcon = ({
  onChangeDo,
  important
}) => {
  let iconStyle = {
    ...iconStyles,
    icon: {
      ...iconStyles.icon,
      color: important.color
    }
   }
  return (
    <IconMenu
      onChange={onChangeDo}
      value={important.value}
      iconButtonElement={(
            <IconButton
              tooltip="Set as important"
              tooltipPosition="top-right"
              className="line-buttons"
              style={iconStyle.iconArea}
              iconStyle={iconStyle.icon}>
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
}/*
<Badge 
    badgeContent={important.value}
    style={{width: '94%', margin: 0, padding: 0}}
    badgeStyle={{backgroundColor: important.color, left: 313, margin: 0, padding: 0}}
    >
</Badge>  */