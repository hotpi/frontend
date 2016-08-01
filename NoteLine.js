import React from 'react';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionTouchApp from 'material-ui/svg-icons/action/touch-app';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
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
  lightBlue50,
  greenA100,
  orangeA100,
  cyanA100,
  grey400
} from 'material-ui/styles/colors'

const importantColors = [grey400, amber700, amber400, amber100];
const highlightColors = [grey400, yellowA100, blueA100, greenA100, orangeA100, cyanA100];

const lineOutHover = {
  notLast: {
    margin: '0',
    padding: '0 1.5em 0 3em'
  },
  last: {
    padding: '0 1.5em 0 1em'
  }
}

const iconStyles = {
  icon: {
    width: '18px',
    height: '18px',
    fontSize: '18px',
    color: 'grey'
  },
  iconArea: {
    width: '46px',
    height: '46px',
    padding: 0,
    marginRight: 5,
    marginLeft: 0,
    right: 13,
    bottom: 5
  }
};

//TODO: Object assign?
const inlineIconStyle = Object.assign({}, iconStyles, {
  iconArea: {
    padding: 0,
    margin: 10,
    marginTop: 14,
    width: 20,
    height: 20
  }
});

export default class NoteLine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      line: props.line,
      isEmpty: props.line.text === '' ? true : false,
      last: props.last,
      options: {
        important: {
          set: false,
          color: amber400,
          value: 0
        },
        reminder: {
          set: false,
          value: "21/12/1991"
        },
        highlight: {
          set: false,
          value: 0,
          color: "transparent"
        }
      }
    }
  }

  componentDidMount() {
    if (this.props.canGetFocus) {
      this._input.focus();
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();  

      if (!this.state.last) {
        return this.props.appendNewLineNext();
      }
    } else if (!e.ctrlKey && !e.altKey && e.keyCode === 8 && this.state.line.text.length === 0) {
      e.preventDefault();

      if (!this.state.last) {
        return this.props.deleteLine();
      }
    } 
  }

  showCancelButton() {
    if (!this.state.last) {
      return (
        <IconButton
          tooltip="Delete line"
          className="line-buttons"
          style={inlineIconStyle.iconArea} 
          iconStyle={inlineIconStyle.icon} 
          onClick={this.handleClickDelete.bind(this)} >
          <NavigationCancel />
        </IconButton>
      );
    }
  }

  showAddIcon() {
    if (this.state.last) {
      return (
        <ContentAdd style={{left: 5, height: 18, width: 18, color: 'grey', paddingTop: 13, paddingRight: 2, marginRight: 5, marginLeft: 5}}/>
      );
    }
  }

  isHighlighted() {
    return this.state.options.highlight.set;
  }

  isImportant() {
    return this.state.options.important.set;
  }

  willBeReminded() {
    return false;//this.state.options.reminder.set;
  }

  showChips() {
    if (this.willBeReminded()) {
      return (
        <Chip 
          style={{height: 20, marginTop: 7, backgroundColor: this.state.options.important.color}}
          labelStyle={{padding: 4, top: 14, margin: 4, marginTop: 0, paddingTop: 0, lineHeight: '1.6em', height: 20}}>
      </Chip>)
    }
/*
    if (this.willBeReminded()) {
      chips = chip || <Chip style={{margin: 4}}>{this.state.options.reminder.value}</Chip>
    }
*/
  }

  showLineOptions() {
    if (!this.state.last) {
      return (
        <div style={{width: '100%', margin: 0, height: 30, display: 'inline-flex'}}>
          <IconButton
            tooltip="Remind me on"
            tooltipPosition="top-right"
            className="line-buttons"
            style={iconStyles.iconArea}
            iconStyle={iconStyles.icon} 
            onClick={this.handleClick.bind(this)} >
            <ActionTouchApp />
          </IconButton>
          {/* TODO: Add onChange functions and values for set as important and highlight color*/}
          <IconMenu
            onChange={this.handleChangeMenu.bind(this, 'important')}
            value={this.state.options.important.value}
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
            onChange={this.handleChangeMenu.bind(this, 'highlight')}
            value={this.state.options.highlight.value}
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
          {this.showChips()}
        </div>
      );
    }
  }

  handleChange(e) {
    if (this.state.isEmpty && this.state.last) {
      this.setState({
        last: false,
        isEmpty: false
      });
      this.props.appendNewLineEnd();
    } 

    this.setState({isEmpty: e.target.value === ''});

    this.setState({
      line: {
          ID: this.state.line.ID,
          text: e.target.value
      }
    }); 
  }

  handleClickDelete(e) {
    this.props.deleteLine();
  }

  handleClick(e) {
    
  }

  handleChangeMenu(type, e, value) {
    switch(type) {
    case 'important':
      if (+value === 0) {
        return this.setState({
          options: {
          important: {
            set: false, 
            value: value, 
            color: importantColors[value]
          },
          reminder: {
            ...this.state.options.reminder
          },
          highlight: {
            ...this.state.options.highlight
          },
        }})

      }
            
      this.setState({
        options:{
          important: {
            set: true,
            value: value,
            color: importantColors[value]
          },
          reminder: {
            ...this.state.options.reminder
          },
          highlight: {
            ...this.state.options.highlight
          },
          
          
        }
        
      }) 
      console.log(this.state.options);
      break;
    case 'highlight':
      if (+value === 0) {
        console.log('highlight', this.state.options.highlight, value, highlightColors[value+1])
        return this.setState({
          options: {
            highlight: {
              set: false, 
              value: value, 
              color: highlightColors[value]
            },
            reminder: {
              ...this.state.options.reminder
            },
            important: {
              ...this.state.options.important
            }
          }
        })

      }
      console.log('highlight', this.state.options.highlight, value, highlightColors[value+1])
      this.setState({
          options: {
            highlight: {
              set: true,
              value: value,
              color: highlightColors[+value]
            },
            reminder: {
              ...this.state.options.reminder
            },
            important: {
              ...this.state.options.important
            }
          }
      }) 
      console.log('highlight', this.state.options.highlight, value)
      break;
    }

  }

  renderLine() {
    return (
    <TextField 
      onChange={this.handleChange.bind(this)}
      onKeyDown={this.handleKeyDown.bind(this)}
      hintText={'Write here to start a new line'}
      rows={1}
      ref={(c) => this._input = c}
      multiLine={true}
      underlineShow={false} 
      textareaStyle={{paddingBottom: 0, backgroundColor: this.isHighlighted() ? this.state.options.highlight.color : 'transparent'}}
      inputStyle={{margin: 0, padding: 0}}
      style={{marginRight: 0, marginTop: 0, width: '94%'}} 
      value={this.state.line.text}>
    </TextField>
    );
  }

  showLine() {
    if (this.isImportant()) {
      return (
        <Badge 
            badgeContent={+this.state.options.important.value}
            style={{width: '94%', margin: 0, padding: 0}}
            badgeStyle={{backgroundColor: this.state.options.important.color, left: 343, margin: 0, padding: 0}}
            >
            {this.renderLine()}
        </Badge>
        )
    } 

    return this.renderLine();

  }

  render() {
    return (
      <div className="note-line-container" style={this.state.last ? lineOutHover.last : lineOutHover.notLast}>
        <div className="line-w-button" tabIndex="0">
          {this.showAddIcon()}

          {this.showLine()}

          {this.showCancelButton()}
          
        </div>

        {this.showLineOptions()}
        
      </div>
    );
  }
}

NoteLine.propTypes =  {
    line: React.PropTypes.shape({
      ID: React.PropTypes.number.isRequired,
      text: React.PropTypes.string
    })
};

NoteLine.defaultProps = { 
  line: {
    text: ''
  }
};
