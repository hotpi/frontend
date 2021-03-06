/**
 * HighlightIcon component which shows the color icon and shows the different options
 *
 * @copyright Juan Cabello
 * @license GPLv3
 * @todo Change React.Component and React.PropTypes to just Component and PropTypes
 * @todo Create a ComponentFactory for this and {@link ImportantIcon}
 */

import React from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import EditorHighlight from 'material-ui/svg-icons/editor/highlight';
import ImageLens from 'material-ui/svg-icons/image/lens';

import {
  yellow500,
  blueA100,
  greenA100,
  orangeA100,
  cyanA100
} from 'material-ui/styles/colors';

import { iconStyles } from '../../helpers/Helpers';

class HighlightIcon extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.highlight !== nextProps.highlight;
  }


  render() {
    const { onChangeDo, highlight } = this.props;
    let iconStyle = {
      ...iconStyles,
      icon: {
        ...iconStyles.icon,
        color: highlight.color
      }
    };

    return (
      <IconMenu
        onChange={onChangeDo}
        value={highlight.value}
        iconButtonElement={(
          <IconButton
            tooltip="Highlight"
            tooltipPosition="top-right"
            className="line-buttons"
            style={iconStyle.iconArea}
            iconStyle={iconStyle.icon} >
            <EditorHighlight />
          </IconButton>
        )}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
        targetOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
      >
          <MenuItem value="0" leftIcon={<ImageLens color="transparent"/>} primaryText="No color" />
          <MenuItem value="1" leftIcon={<ImageLens color={yellow500}/>} primaryText="Yellow" />
          <MenuItem value="2" leftIcon={<ImageLens color={blueA100}/>} primaryText="Blue" />
          <MenuItem value="3" leftIcon={<ImageLens color={greenA100}/>} primaryText="Green" />
          <MenuItem value="4" leftIcon={<ImageLens color={orangeA100}/>} primaryText="Orange" />
          <MenuItem value="5" leftIcon={<ImageLens color={cyanA100}/>} primaryText="Blue-green" />
      </IconMenu>
    );
  }
}

HighlightIcon.propTypes = {
  highlight: React.PropTypes.shape({
    set: React.PropTypes.bool,
    color: React.PropTypes.any.isRequired,
    value: React.PropTypes.any.isRequired
  }).isRequired,
  onChangeDo: React.PropTypes.func.isRequired
};

export default HighlightIcon;
