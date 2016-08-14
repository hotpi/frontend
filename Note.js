import React from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';

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
import NoteFooter from './NoteFooter';
import NoteHeader from './NoteHeader';
import NoteTimestamp from './NoteTimestamp';
import NewNoteButton from './NewNoteButton';

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
  changeNoteType,
  newNote
} from './actions/note';

import { getAllNoteLines, getNotesByTypeFromPatient, getFirstPatientId } from './reducers/index';

import { typeValues } from './Helpers';

import { noteIds } from './configureStore' // Delete me when the time is right

class Note extends React.Component {
  constructor() {
    super();
    this.state = {
      canAllocateFocus: false,
      hasFocus: false,
      isInArea: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleNewButton = this.handleNewButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    this.props.type === 'new' ? this.props.newNote(this.props.patientId) : null;
  }

  componentDidMount() {
    const { type } = this.props;
    this.setState({ canAllocateFocus: true });

    if (this.last && !this.last.isEmpty && type === "new") {
      this.createNewLine(null, 'append_end')
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.noteLines.length !== nextProps.noteLines.length || this.props.type !== nextProps.type || this.state.hasFocus !== nextState.hasFocus
  }

  isNoteLineEmpty() {
    if (this.props.noteLines.length < 1) {
      return false;
    }

    return this.props.noteLines[0].text === '';
  }

  canShowHeaderAndFooter() {
    return this.props.noteLines.length > 1 || this.state.hasFocus || !this.isNoteLineEmpty() || this.props.type !== "new"
  }

  createNewLine(index, positionToInsert) {
    switch(positionToInsert) {
      case 'append_next': 
        this.props.createAndAppendNext(index, this.props.noteId);
        this.setState({canAllocateFocus: true});
        break;
      case 'append_end':
        this.props.createAndAppendLast(this.props.noteId);
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
    if (e.keyCode === 13) {
      e.preventDefault();  

      if (!last) {
        this.createNewLine(index, 'append_next');
      }
    } else if (!e.ctrlKey && !e.altKey && e.keyCode === 8 && this.props.noteLines[index].text.length === 0) {
      e.preventDefault();

      if (!last) {
        this.props.deleteLine(id, this.props.noteId);
      }
    } 
  }

  handleChange(id, last, isEmpty, e) {
    if (isEmpty && last) {
      this.createNewLine(null, 'append_end');
    } 

    this.props.updateLineValue(id, e);
  }

  handleNewButton() {
    this.props.newNote(this.props.patientId)
    browserHistory.push('/patient/' + this.props.patientId + '/new')
  }

  lineModifierHandler(id, type, e, value) {
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
    const noteLinesTotal = this.props.noteLines.length
    noteLines = this.props.noteLines.map((noteLine, index) => {
      const ID = noteLine.ID;
      const line = noteLine;
      const last = (index === (noteLinesTotal - 1))
      const isEmpty = line.text === '';

      if (last) {
        _set(this, 'last.isEmpty', isEmpty); 
      }

      return (
        <NoteLine
          noteId={this.props.noteId} // Delete me when the time is right
          key={ID} 
          last={last}
          isEmpty={isEmpty}
          type={type}
          ID={ID}
          keyDownHandler={this.handleKeyDown.bind(this, ID, index, last)} 
          onChangeDo={this.handleChange.bind(this, ID, last, isEmpty)}
          canGetFocus={this.state.canAllocateFocus} 
          deleteLine={this.props.deleteLine.bind(this, ID, this.props.noteId)}
          onImportant={this.lineModifierHandler.bind(this, ID, 'onImportant')}
          onHighlight={this.lineModifierHandler.bind(this, ID, 'onHighlight')}
          />
      );  
    })

    return noteLines;    
  }

  render() {
    const { type } = this.props; // TODO: Title can be get from the type, no need to pass it down
    const title = typeValues.reduce((prev, curr) => {
      if (curr.type === type) {
        prev = curr.title
      }
      return prev;
    }, '')

    return (
      <div style={{height: 532,  overflowY: 'auto', display: 'block'}}>
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
              onChangeDo={(e, index, value) => this.props.changeNoteType(index, this.props.noteId)}
              onSaveDo={() => this.props.saveNote()}
              />     

          </Paper>
          <NoteTimestamp 
            type={type}
            // date={} // TODO: Don't forget to set the date
            />
        </div>
        <NewNoteButton
          onClickDo={this.handleNewButton}
         />
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
  type: 'new'
} 

const mapStateToProps = (state, { params }) => {
  const patientId = params.patientId || getFirstPatientId(state);
  const typeFilter = params.type || 'new';
  const patientNotes = getNotesByTypeFromPatient(state, patientId, typeFilter);
  const noteLines = patientNotes[0] && getAllNoteLines(state, patientNotes[0].ID) || [];

  return {
    noteLines,
    noteId: patientNotes[0] && patientNotes[0].ID || null,
    patientId
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    createAndAppendNext: (index, noteId) => dispatch(createAndAppendNext(index, noteId)),
    createAndAppendLast: (noteId) => dispatch(createAndAppendLast(noteId)),
    deleteLine: (id, noteId) => dispatch(deleteLine(id, noteId)),
    changeNoteType: (index, noteId) => dispatch(changeNoteType(index, noteId)),
    updateLineValue: (id, e) => dispatch(updateLineValue(id, e.target.value)),
    onImportant: (id, value) => dispatch(importantLine(id, value)),
    onHighlight: (id, value) => dispatch(highlightLine(id, value)),
    saveNote: () => dispatch({type: 'NOT_FOUND'/*saveNote()*/}),
    newNote: (patientId) => dispatch(newNote(patientId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Note));