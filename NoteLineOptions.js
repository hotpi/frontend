import React from 'react';

/*import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';

import ActionTouchApp from 'material-ui/svg-icons/action/touch-app';
import ContentMoveToInbox from 'material-ui/svg-icons/content/move-to-inbox';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import { iconStyles, importantColors, highlightColors } from './Helpers'
*/

import { ImportantIcon } from './ImportantIcon';
import { HighlightIcon } from './HighlightIcon';

export default class NoteLineOptions extends React.Component {
  /*
  showChips() {
    if (this.props.reminder.set) {
      return (
        <Chip 
          style={{height: 20, marginTop: 7}}
          labelStyle={{padding: 4, top: 14, margin: 4, marginTop: 0, paddingTop: 0, lineHeight: '1.6em', height: 20}}>
      </Chip>)
    }
  }*/

  render() {
    const { onHighlight, onImportant, highlight, important, last } = this.props
    if (!last) {
      return (
          <div style={{width: '100%', margin: 0, height: 30, display: 'inline-flex'}}>
            {/*<IconButton
              tooltip="Remind me on"
              tooltipPosition="top-right"
              className="line-buttons"
              style={iconStyles.iconArea}
              iconStyle={iconStyles.icon} >
              <ActionTouchApp />
            </IconButton>*/}
            <ImportantIcon 
              onChangeDo={onImportant}
              important={important}
              />
            <HighlightIcon 
              onChangeDo={onHighlight}
              highlight={highlight}
              />
            {/*<IconButton
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
            </IconButton> */}
            {/*this.showChips()*/}
          </div>
        );
    }
    
    return (
        <div style={{display: 'none'}}></div> //Just to return something
      );
  }
}

