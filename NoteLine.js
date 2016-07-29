import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import ActionTouchApp from 'material-ui/svg-icons/action/touch-app';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import EditorHighlight from 'material-ui/svg-icons/editor/highlight';
import ContentMoveToInbox from 'material-ui/svg-icons/content/move-to-inbox';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

const lineOutHover = {
  margin: '0',
  padding: '0 3em'
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
const cancelIconStyle = Object.assign({}, iconStyles, {
  iconArea: {
    padding: 0,
    margin: 10,
    marginTop: 14,
    width: 20,
    height: 20
  }
});

const cancelIconStyleOut = Object.assign({}, cancelIconStyle, {
  iconArea: {
    visibility: 'hidden'
  }
});

const cancelIconStyleOver = Object.assign({}, cancelIconStyle, {
  iconArea: {
    visibility: 'visible'
  }
});

export default class NoteLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line: props.line,
      canGetFocus: this.props.canGetFocus,
      isEmpty: props.line.text === '' ? true : false,
      last: this.props.last
    };
    console.log(this.state);
  }

  componentDidMount() {
    if (this.state.canGetFocus) {
      this._input.focus();
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();  
      return this.props.appendNewLineNext();
    }
  }

  handleChange(e) {
    this.setState({text: e.target.value}); 

    if (this.state.isEmpty && this.state.last) {
      this.setState({last: Object.assign({}, this.state.last, {
        last: !this.state.last
      })})
      this.props.appendNewLineEnd();
    }

    if (e.target.value === '') {
      this.setState({isEmpty: true});
    } else {
      this.setState({isEmpty: false});
    }
  }

  handleClickDelete(e) {
    this.props.deleteLine();
  }

  handleClick(e) {

  }

  render() {
    return (
      <div className="note-line-container" style={lineOutHover}>
        <div style={{display: 'inline-flex', marginBottom: '0', width: '100%'}} tabIndex="0">
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
            value={this.state.text}/>
          <IconButton
            tooltip="Delete line"
            className="cancel-button"
            style={this.state.cancelIcon} 
            iconStyle={cancelIconStyle.icon} 
            onClick={this.handleClickDelete.bind(this)} >
            <NavigationCancel />
          </IconButton>
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
