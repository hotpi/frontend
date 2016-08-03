import React from 'react';

import _ from 'lodash';

import { createStore } from 'redux';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

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

import NoteLineOptions from './NoteLineOptions'
import { CancelButton } from './CancelButton'
import { AddIcon } from './AddIcon'

export const importantColors = ["transparent", amber700, amber400, amber100];
export const highlightColors = ["transparent", yellowA100, blueA100, greenA100, orangeA100, cyanA100];

const lineOutHover = {
  notLast: {
    margin: '0',
    padding: '0 1.5em 0 3em'
  },
  last: {
    padding: '0 1.5em 0 1em'
  }
}

export const iconStyles = {
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

export const inlineIconStyle = Object.assign({}, iconStyles, {
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
      isEmpty: props.text === '' ? true : false,
      last: props.last
    }
    this.store = this.props.store
    console.log(this.store)
  }

  componentDidMount() {
    if (this.props.canGetFocus) {
      this._input.focus();
    }
    this.store.subscribe(() => this.forceUpdate());
  }

  isHighlighted() {
    return this.props.highlight.set;
  }

  isImportant() {
    return this.props.important.set;
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();  

      if (!this.state.last) {
        return this.props.appendNewLineNext();
      }
    } else if (!e.ctrlKey && !e.altKey && e.keyCode === 8 && this.state.text.length === 0) {
      e.preventDefault();

      if (!this.state.last) {
        return this.props.deleteLine();
      }
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

    this.props.store.dispatch({
      type: 'UPDATE_LINE_VALUE',
      ID: this.props.ID,
      text: e.target.value
    })
  }

  getLine() {
    return (
    <TextField 
      onChange={this.handleChange.bind(this)}
      onKeyDown={this.handleKeyDown.bind(this)}
      hintText={'Write here to start a new line'}
      rows={1}
      ref={(c) => this._input = c}
      multiLine={true}
      underlineShow={false} 
      textareaStyle={{paddingBottom: 0, backgroundColor: this.isHighlighted() ? this.props.highlight.color : 'transparent'}}
      inputStyle={{margin: 0, padding: 0}}
      style={{marginRight: 0, marginTop: 0, width: '94%'}} 
      value={this.props.text}
      >
    </TextField>
    );
  }

  renderLine() {
    if (this.isImportant()) {
      return (
        <Badge 
            badgeContent={this.props.important.value}
            style={{width: '94%', margin: 0, padding: 0}}
            badgeStyle={{backgroundColor: this.props.important.color, left: 313, margin: 0, padding: 0}}
            >
            {this.getLine()}
        </Badge>
        )
    } 

    return this.getLine();
  }

  render() {
    return (
      <div className="note-line-container" style={this.state.last ? lineOutHover.last : lineOutHover.notLast}>
        <div className="line-w-button" tabIndex="0">
          <AddIcon last={this.state.last} />

          {this.renderLine()}

          <CancelButton last={this.state.last} onClick={this.props.deleteLine} />
          
        </div>

        <NoteLineOptions
          last={this.state.last}
          importantValue={this.props.important}
          highlightValue={this.props.highlight}
          onHighlight={(e, value) => this.props.store.dispatch({
              type: 'HIGHLIGHT_LINE', 
              color: highlightColors[+value],
              ID: this.props.ID,
              value: value                    
            })
          }
          onImportant={(e, value) => this.props.store.dispatch({
              type: 'IMPORTANT_LINE',
              color: importantColors[+value],
              ID: this.props.ID,
              value: value
            })
          }
          />
        
      </div>
    );
  }
}

