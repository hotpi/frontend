import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionTouchApp from 'material-ui/svg-icons/action/touch-app';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import EditorHighlight from 'material-ui/svg-icons/editor/highlight';
import ContentMoveToInbox from 'material-ui/svg-icons/content/move-to-inbox';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

const lineOutHover = {
  notLast: {
    margin: '0',
    padding: '0 3em'
  },
  last: {
    padding: '0 3em 0 1em'
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
      last: this.props.last
    };
  }

  componentDidMount() {
    if (this.props.canGetFocus) {
      this._input.focus();
    }
  }

  handleKeyDown(e) {
    console.log('ctrl, alt', e.ctrlKey, e.altKey);
    if (e.keyCode === 13) {
      e.preventDefault();  
      if (!this.state.last) {
        return this.props.appendNewLineNext();
      }
    } else if (!e.ctrlKey && !e.altKey && e.keyCode === 8 && this.state.line.text.length === 0) {
      console.log('enter');
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
          className="cancel-button"
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

  render() {
    return (
      <div className="note-line-container" style={this.state.last ? lineOutHover.last : lineOutHover.notLast}>
        <div className="line-w-button" tabIndex="0">
          {this.showAddIcon()}
          <TextField 
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            hintText={'Write here to start a new line'}
            rows={1}
            ref={(c) => this._input = c}
            multiLine={true}
            underlineShow={false} 
            textareaStyle={{paddingBottom: 0}}
            inputStyle={{margin: 0, padding: 0}}
            style={{marginRight: 0, marginTop: 0, width: '94%'}} 
            value={this.state.line.text}/>
          {this.showCancelButton()}
          
        </div>
        <div style={{width: '100%', margin: 0, height: 30}}>
          <IconButton
            tooltip="Remind me on"
            className="cancel-button"
            style={iconStyles.iconArea}
            iconStyle={iconStyles.icon} 
            onClick={this.handleClick.bind(this)} >

            <ActionTouchApp />
          </IconButton>
          <IconButton
            tooltip="Set as important"
            className="cancel-button"
            style={iconStyles.iconArea}
            iconStyle={iconStyles.icon} 
            onClick={this.handleClick.bind(this)}>
            <ToggleStar/>
          </IconButton>
          <IconButton
            tooltip="Highlight"
            className="cancel-button"
            style={iconStyles.iconArea}
            iconStyle={iconStyles.icon} >
            <EditorHighlight/>
          </IconButton>
          <IconButton
            tooltip="Move to history"
            className="cancel-button"
            style={iconStyles.iconArea}
            iconStyle={iconStyles.icon} >
            <ContentMoveToInbox />
          </IconButton>
          <IconButton
            tooltip="More options"
            className="cancel-button"
            style={iconStyles.iconArea}
            iconStyle={iconStyles.icon} >
            <NavigationMoreVert/> 
          </IconButton>
        </div>
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
