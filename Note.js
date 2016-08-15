import React from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';

import { get as _get , set as _set, forOwn as _forOwn, merge as _merge, assignIn } from 'lodash';

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
  newNote,
  deleteNote,
  mergeNotes
} from './actions/note';

import { getAllNoteLines, getNotesByTypeFromPatient, getFirstPatientId, getAllPatientNotes, getNoteLine } from './reducers/index';

import { typeValues, dateToString } from './Helpers';

import { noteIds } from './configureStore' // Delete me when the time is right

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canAllocateFocus: false,
      hasFocus: false,
      type: "" + typeValues.map(typeObj => typeObj.type).indexOf(props.type)
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleNewButton = this.handleNewButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectField = this.handleSelectField.bind(this);
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
    return this.props.noteLines.length !== nextProps.noteLines.length || this.props.type !== nextProps.type || this.state.hasFocus !== nextState.hasFocus || this.state.type !== nextState.type
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
        this.props.createAndAppendNext(index, this.props.note.ID);
        this.setState({canAllocateFocus: true});
        break;
      case 'append_end':
        this.props.createAndAppendLast(this.props.note.ID);
        this.setState({canAllocateFocus: false});
        break;
      default:
        console.log('error')
    }    
  }

  saveNote() {
    if (this.state.type === "0") {
      return alert("Type must me set"); // TODO: Deliver a prettier alert
    }

    
    _forOwn(this.props.noteLines, (value, key) => {
      if (value.text === '') {
        this.props.deleteLine(value.ID, this.props.note.ID)
      }
    })

    const notesFromSelectedType = this.props.patientNotes().filter(note => note.type === typeValues[+this.state.type].type)

    switch (+this.state.type) {
      case 1:
      case 3:
        notesFromSelectedType[0].noteLines = [...notesFromSelectedType[0].noteLines, ...this.props.noteLines.filter(noteLine => noteLine.text !== '').map(noteLine => noteLine.ID)]
        this.props.mergeNotes(notesFromSelectedType[0].ID, notesFromSelectedType[0].noteLines)
        this.props.deleteNote(this.props.patientId, this.props.note.ID)
        break;
      case 2:
        this.props.changeNoteType(this.props.note.ID, +this.state.type)
        const sortedNotes = notesFromSelectedType.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return -1;
          } else if (a.createdAt > b.createdAt) {
            return 1;
          } else {
            return 0;
          }
        })
        const lastSavedNote = sortedNotes[sortedNotes.length-1];
        const lastDate = new Date(lastSavedNote.createdAt)
        const currentDate = new Date()

        // if it's from the same day -> merge
        if (lastDate.getDate() === currentDate.getDate() && lastDate.getMonth() === currentDate.getMonth() && lastDate.getFullYear() === currentDate.getFullYear()) {
          lastSavedNote.noteLines = [...lastSavedNote.noteLines, ...this.props.noteLines.filter(noteLine => noteLine.text !== '').map(noteLine => noteLine.ID)]
          this.props.mergeNotes(lastSavedNote.ID, lastSavedNote.noteLines)
          this.props.deleteNote(this.props.patientId, this.props.note.ID)
        }
        // if it's not from the same day -> get important lines, add them to this note and do nothing 
        else {
          this.props.note.noteLines = [...lastSavedNote.noteLines.map(noteLineId => this.props.getNoteLineObj(noteLineId)).filter(noteLine => noteLine.important.set).map(noteLine => noteLine.ID), ...this.props.note.noteLines]
          this.props.mergeNotes(this.props.note.ID, this.props.note.noteLines)
        }
      default:
        break;
    }
//    this.props.mergeNotes(this.props.patientId, this.props.note.ID, +this.state.type)

    this.setState({type: "0", canAllocateFocus: true, hasFocus: false})
    this.props.newNote(this.props.patientId);
  }

  handleSelectField(e, index, value) {
    this.setState({type: value}) 
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
        this.props.deleteLine(id, this.props.note.ID);
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
      const last = (index === (noteLinesTotal - 1)) && type === "new"
      const isEmpty = line.text === '';

      if (last) {
        _set(this, 'last.isEmpty', isEmpty); 
      }

      return (
        <NoteLine
          noteId={this.props.note.ID} // Delete me when the time is right
          key={ID} 
          last={last}
          isEmpty={isEmpty}
          type={type}
          ID={ID}
          keyDownHandler={this.handleKeyDown.bind(this, ID, index, last)} 
          onChangeDo={this.handleChange.bind(this, ID, last, isEmpty)}
          canGetFocus={this.state.canAllocateFocus} 
          deleteLine={this.props.deleteLine.bind(this, ID, this.props.note.ID)}
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
              value={this.state.type}
              onChangeDo={this.handleSelectField}
              onSaveDo={() => this.saveNote()}
              />     

          </Paper>
          <NoteTimestamp 
            type={type}
            date={this.props.note && new Date(this.props.note.createdAt) || new Date()} // TODO: Don't forget to set the date
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
  const patientNotesFromType = getNotesByTypeFromPatient(state, patientId, typeFilter);
  var sortedNotes = patientNotesFromType;

  if (patientNotesFromType.length > 1) {
    sortedNotes = patientNotesFromType.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      } else if (a.createdAt > b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    })
  }
  // const allPatientNotes = getAllPatientNotes(state, patientId);
  const noteLines = sortedNotes[0] && getAllNoteLines(state, sortedNotes[0].ID) || [];

  return {
    noteLines,
    note: sortedNotes[0] || null,
    patientId,
    patientNotes: () => getAllPatientNotes(state, patientId),
    getNoteLineObj: (noteLineId) => getNoteLine(state, noteLineId)
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    createAndAppendNext: (index, noteId) => dispatch(createAndAppendNext(index, noteId)),
    createAndAppendLast: (noteId) => dispatch(createAndAppendLast(noteId)),
    deleteLine: (id, noteId) => dispatch(deleteLine(id, noteId)),
    changeNoteType: (noteId, index) => dispatch(changeNoteType(noteId, index)),
    updateLineValue: (id, e) => dispatch(updateLineValue(id, e.target.value)),
    onImportant: (id, value) => dispatch(importantLine(id, value)),
    onHighlight: (id, value) => dispatch(highlightLine(id, value)),
    saveNote: () => dispatch({type: 'NOT_FOUND'/*saveNote()*/}),
    newNote: (patientId) => dispatch(newNote(patientId)),
    deleteNote: (patientId, noteId) => dispatch(deleteNote(patientId, noteId)),
    mergeNotes: (patientId, noteId, type) => dispatch(mergeNotes(patientId, noteId, type))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Note));