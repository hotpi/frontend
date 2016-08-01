import React from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

import ActionTouchApp from 'material-ui/svg-icons/action/touch-app';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import EditorHighlight from 'material-ui/svg-icons/editor/highlight';
import ContentMoveToInbox from 'material-ui/svg-icons/content/move-to-inbox';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ImageLens from 'material-ui/svg-icons/image/lens';

import {
  amber700,
  amber400,
  amber100,
  yellowA100,
  blueA100,
  greenA100,
  orangeA100,
  cyanA100
} from 'material-ui/styles/colors'

import { iconStyles, importantColors, highlightColors } from './NoteLine'

export default class NoteLineOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reminder: props.reminder,
      highlight: props.highlight,
      important: props.important
    }
  }

  handleChange(type, e, value) {
    switch (type) {
    case 'highlight':
      let newStateHighlight = {set: +value !== 0, color: highlightColors[+value], value: value}
      this.setState({highlight: newStateHighlight});
      this.props.updateOptions({highlight: newStateHighlight});
      break;
    case 'important':
      let newStateImportant = {set: +value !== 0, color: importantColors[+value], value: value}
      this.setState({important: newStateImportant})
      this.props.updateOptions({important: newStateImportant})
      break;
    }
  }


  showChips() {
    if (this.props.reminder.set) {
      return (
        <Chip 
          style={{height: 20, marginTop: 7}}
          labelStyle={{padding: 4, top: 14, margin: 4, marginTop: 0, paddingTop: 0, lineHeight: '1.6em', height: 20}}>
      </Chip>)
    }
  }

  render() {
    return (
        <div style={{width: '100%', margin: 0, height: 30, display: 'inline-flex'}}>
          <IconButton
            tooltip="Remind me on"
            tooltipPosition="top-right"
            className="line-buttons"
            style={iconStyles.iconArea}
            iconStyle={iconStyles.icon} >
            <ActionTouchApp />
          </IconButton>
          {/* TODO: Add onChange functions and values for set as important and highlight color*/}
          <IconMenu
            onChange={this.handleChange.bind(this, 'important')}
            value={this.state.important.value}
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
          <IconMenu
            onChange={this.handleChange.bind(this, 'highlight')}
            value={this.state.highlight.value}
            iconButtonElement={(
              <IconButton
                tooltip="Highlight"
                tooltipPosition="top-right"
                className="line-buttons"
                style={iconStyles.iconArea}
                iconStyle={iconStyles.icon} >
                <EditorHighlight />
              </IconButton>
            )}            
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}>
              <MenuItem value="0" leftIcon={<ImageLens color="transparent"/>} primaryText="No color" />
              <MenuItem value="1" leftIcon={<ImageLens color={yellowA100}/>} primaryText="Yellow" />
              <MenuItem value="2" leftIcon={<ImageLens color={blueA100}/>} primaryText="Blue" />
              <MenuItem value="3" leftIcon={<ImageLens color={greenA100}/>} primaryText="Green" />
              <MenuItem value="4" leftIcon={<ImageLens color={orangeA100}/>} primaryText="Orange" />
              <MenuItem value="5" leftIcon={<ImageLens color={cyanA100}/>} primaryText="Blue-green" />
          </IconMenu>
          <IconButton
            tooltip="Move to history"
            tooltipPosition="top-right"
            className="line-buttons"
            style={iconStyles.iconArea}
            iconStyle={iconStyles.icon} >
            <ContentMoveToInbox />
          </IconButton>
          <IconButton
            tooltip="More options"
            tooltipPosition="top-right"
            className="line-buttons"
            style={iconStyles.iconArea}
            iconStyle={iconStyles.icon} >
            <NavigationMoreVert /> 
          </IconButton> 
          {/*this.showChips()*/}
        </div>
      );
  } 
}

