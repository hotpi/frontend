import React from 'react';
import { connect } from 'react-redux';

import { get as _get } from 'lodash';
import { set as _set } from 'lodash';
import { assignIn } from 'lodash';

import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import NoteLine from './NoteLine';
import { iconStyles } from './NoteLine';
import { typeValues } from './NoteFooter';
import NoteFooter from './NoteFooter';
import NoteHeader from './NoteHeader';
import NoteTimestamp from './NoteTimestamp';

import { 
  createAndAppendNext,
  createAndAppendLast,
  deleteLine,
  updateLineValue, 
  notEmptyAndNotLast, 
  importantLine, 
  highlightLine 
} from './actions/noteLines';

import {
  changeNoteType
} from './actions/note';

import * as fromNoteLines from './reducers/noteLines'

class Note extends React.Component {
  constructor() {
    super();
    this.state = {
      canAllocateFocus: false,
      hasFocus: false,
      isInArea: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { type } = this.props;
    this.setState({canAllocateFocus: true});

    if (!this.last.isEmpty && type === "New") {
      this.createNewLine(null, 'append_end')
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.noteLinesIds.length !== nextProps.noteLinesIds.length || this.props.type !== nextProps.type
  }

  isNoteLineEmpty() {
    if (this.props.noteLinesIds.length < 1) {
      return false;
    }

    return this.props.noteLines[0].noteLine.text === '';
  }

  canShowHeaderAndFooter() {
    return this.props.noteLinesIds.length > 1 || this.state.hasFocus || !this.isNoteLineEmpty() || this.props.type !== "New"
  }

  createNewLine(index, positionToInsert) {
    switch(positionToInsert) {
      case 'append_next': 
        console.log(index);

        this.props.createAndAppendNext(index);
        this.setState({canAllocateFocus: true});
        break;
      case 'append_end':
        this.props.createAndAppendLast();
        this.setState({canAllocateFocus: false});
        break;
      default:
        console.log('error')
    }    
  }

  handleClick(e) {
    this.setState({hasFocus: true});
  }


  handleKeyDown(id, index, last, e) {
    console.log('handleKeyDown: ', this.props.noteLines, this.props.noteLines[id]);
    if (e.keyCode === 13) {
      e.preventDefault();  
      console.log(index);
      if (!last) {
        this.createNewLine(index, 'append_next');
      }
    } else if (!e.ctrlKey && !e.altKey && e.keyCode === 8 && this.props.noteLines[index].noteLine.text.length === 0) {
      e.preventDefault();

      if (!last) {
        this.props.deleteLine(id, index);
      }
    } 
  }

  handleChange(id, last, isEmpty, e) {
    if (isEmpty && last) {
      this.createNewLine(null, 'append_end');
    } 

    this.props.updateLineValue(id, e);
  }

  lineModifierHandler(id, type, e, value) {
    console.log('lineModifierHandler')
    switch (type) {
      case 'onImportant':
        return this.props.onImportant(id, value);
      case 'onHighlight':
        return this.props.onHighlight(id, value);
    }
  }

  renderNoteLines() {
    var noteLines = {};
    const { type } = this.props; 

    noteLines = this.props.noteLines.map((noteLine, index) => {
      if (noteLine.noteLine) {
        const ID = noteLine.ID;
        const line = noteLine.noteLine
        const last = (index === (this.props.noteLinesIds.length - 1))
        const isEmpty = line.text === '';

        if (last) {
          _set(this, 'last.isEmpty', isEmpty); 
        }

        return (
          <NoteLine
            key={ID} 
            last={last}
            isEmpty={isEmpty}
            type={type}
            ID={ID}
            keyDownHandler={this.handleKeyDown.bind(this, ID, index, last)} 
            onChangeDo={this.handleChange.bind(this, ID, last, isEmpty)}
            canGetFocus={this.state.canAllocateFocus} 
            deleteLine={this.props.deleteLine.bind(this, ID, index)}
            onImportant={this.lineModifierHandler.bind(this, ID, 'onImportant')}
            onHighlight={this.lineModifierHandler.bind(this, ID, 'onHighlight')}
            {...line}/>
        );  
      } else {
        return null;
      }
    })

    return noteLines;    
  }

  render() {
    const { type, title } = this.props; // TODO: Title can be get from the type, no need to pass it down

    return (
      <div style={{height: 532,  overflowY: 'auto'}}>
        <div
          style={{margin: '3em 0 3em 8em', display: 'inline-flex'}}
          >

          <Paper
            zDepth={2}
            style={{left: '19.2em', width: '470px', height: 'auto'}}
            onClick={this.handleClick}>
            
            <NoteHeader 
              show={this.canShowHeaderAndFooter()}
              title={title}
              />

            <Divider />

            <div style={{padding: '1em 0', margin: '0'}}>
              {this.renderNoteLines()}
            </div>

            <Divider />

            <NoteFooter 
              show={this.canShowHeaderAndFooter()}
              type={type}
              onChangeDo={(e, index, value) => this.props.changeNoteType(index)}
              />     

          </Paper>
          <NoteTimestamp 
            type={type}
            // date={} // TODO: Don't forget to set the date
            />
        </div>
      </div>
    );
  }
};

Note.propTypes = {
  type: React.PropTypes.string,
  title: React.PropTypes.string
}

Note.defaultProps = {
  title: 'New note',
  type: 'New'
} 

const mapStateToProps = (state, ownProps) => {
  const noteLinesIds = _get(state.noteLines, 'allIds');
  const noteLinesObjs = _get(state.noteLines, 'byId');
  const noteLines = noteLinesIds && noteLinesIds.map(noteLineId => ({
    ID: noteLineId,
    noteLine: noteLinesObjs[noteLineId]
  }))

  return {
    ...ownProps,
    noteLines,
    noteLinesIds
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    createAndAppendNext: (index) => dispatch(createAndAppendNext(index)),
    createAndAppendLast: () => dispatch(createAndAppendLast()),
    deleteLine: (id, index) => dispatch(deleteLine(id, index)),
    changeNoteType: (index) => dispatch(changeNoteType(index)),
    updateLineValue: (id, e) => dispatch(updateLineValue(id, e.target.value)),
    onImportant: (id, value) => dispatch(importantLine(id, value)),
    onHighlight: (id, value) => dispatch(highlightLine(id, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);