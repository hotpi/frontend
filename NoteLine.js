import React from 'react';

import _ from 'lodash';

import { createStore } from 'redux';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

import NoteLineOptions from './NoteLineOptions'
import CancelButton from './CancelButton'
import AddIcon from './AddIcon'
import LineText from './LineText'

import { lineOutHover, iconStyles, inlineIconStyle, importantColors, highlightColors } from './Helpers';

import { 
  updateLineValue, 
  notEmptyAndNotLast, 
  importantLine, 
  highlightLine 
} from './actions/noteLines'

export default class NoteLine extends React.Component {

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();  

      if (!this.props.last) {
        this.props.appendNewLineNext();
      }
    } else if (!e.ctrlKey && !e.altKey && e.keyCode === 8 && this.props.text.length === 0) {
      e.preventDefault();

      if (!this.props.last) {
        this.props.deleteLine();
      }
    } 
  }

  handleChange(e) {
    // TODO: Dispatch new line at the end action and
    if (this.props.text.length === 0 && this.props.last) {
      this.props.store.dispatch(notEmptyAndNotLast(this.props.ID))
      this.props.appendNewLineEnd();
    } 

    this.props.store.dispatch(updateLineValue(this.props.ID, e.target.value))
  }

  render() {
    const { deleteLine, last, important, highlight, store, ID, text, canGetFocus } = this.props

    return (
      <div className="note-line-container" style={last ? lineOutHover.last : lineOutHover.notLast}>
        <div className="line-w-button" tabIndex="0">
          <AddIcon 
            last={last} 
            />
          <LineText 
            onChangeDo={this.handleChange.bind(this)}
            onKeyDownDo={this.handleKeyDown.bind(this)}
            text={text}
            highlight={highlight}
            canGetFocus={canGetFocus}
            />
          <CancelButton 
            last={last}
            onClickDo={deleteLine}
            />          
        </div>
        <NoteLineOptions
          last={last}
          important={important}
          highlight={highlight}
          onHighlight={(e, value) => store.dispatch(highlightLine(ID, value))}
          onImportant={(e, value) => store.dispatch(importantLine(ID, value))}
          />        
      </div>
    );
  }
}

