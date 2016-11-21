import React from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';

import { v4 } from 'node-uuid';
import { get as _get , has as _has, set as _set, forOwn as _forOwn, merge as _merge, assignIn } from 'lodash';

import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import NoteLine from '../noteline/NoteLine';
import NoteFooter from './NoteFooter';
import NoteHeader from './NoteHeader';
import NoteTimestamp from './NoteTimestamp';
import NewNoteButton from '../top-view/NewNoteButton';
import HistoryNavigation from './HistoryNavigation';
import EmptySelection from '../../helpers/EmptySelection';

import { 
  createAndAppendNext,
  createAndAppendLast,
  deleteLine,
  updateLineValue, 
  notEmptyAndNotLast, 
  importantLine, 
  highlightLine 
} from '../../../actions/noteLines';

import {
  changeNoteType,
  newNote,
  deleteNote,
  mergeNotes
} from '../../../actions/note';

import { getAllNoteLines, getNotesByTypeFromPatient, getFirstPatientId, getAllPatientNotes, getNoteLine } from '../../../reducers';

import { typeValues, dateToString } from '../../helpers/Helpers';

class Note extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      canAllocateFocus: false,
      hasFocus: false,
      type: '' + typeValues.map(typeObj => typeObj.type).indexOf(props.type)
    }
    this.selStart = 0
    this.selEnd = 0
    this.handleClick = this.handleClick.bind(this)
    this.handleNewButton = this.handleNewButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectField = this.handleSelectField.bind(this)
  }

  componentWillMount() {
    if (this.props.type === 'new' && this.props.note === null) {
      this.props.newNote(this.props.patientId) 
    }
  }

  componentDidMount() {
    const { type } = this.props;

    this.setState({ canAllocateFocus: true })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return _has(this.props, 'note.ID') !== _has(nextProps, 'note.ID') || this.props.noteLines.length !== nextProps.noteLines.length || this.props.type !== nextProps.type || this.state.hasFocus !== nextState.hasFocus || this.state.type !== nextState.type;
  }

  isNoteLineEmpty() {
    if (this.props.noteLines.length < 1 || !_has(this.props.noteLines[0], 'text')) {
      return false;
    }

    return this.props.noteLines[0].text === '';
  }

  canShowHeaderAndFooter(part) {
    if (part === 'header') {
      return this.props.noteLines.length > 1 || this.state.hasFocus || !this.isNoteLineEmpty() || this.props.type !== 'new';
    } 

    return (this.props.noteLines.length > 1 || this.state.hasFocus || !this.isNoteLineEmpty()) && this.props.type === 'new';
  }

  createNewLine(index, positionToInsert) {
    switch(positionToInsert) {
      case 'append_next': 
        this.props.createAndAppendNext(index, this.props.note.ID)
        this.setState({canAllocateFocus: true})
        break;
      case 'append_end':
        this.props.createAndAppendLast(this.props.note.ID)
        this.setState({canAllocateFocus: false})
        break;
      default:
        console.log('error')
    }    
  }

  saveNote() {
    if (this.state.type === '0') {
      return alert('Type must me set'); // TODO: Deliver a prettier alert
    }

    
    _forOwn(this.props.noteLines, (value, key) => {
      if (value.text === '') {
        this.props.deleteLine(value.ID, this.props.note.ID)
      }
    })

    const notesFromSelectedType = this.props.getPatientNotes().filter(note => note.type === typeValues[+this.state.type].type)
    const noteLinesToSave = this.props.noteLines.filter(noteLine => noteLine.text !== '').map(noteLine => noteLine.ID)

    switch (+this.state.type) {
      case 1:
      case 3:
        if (!notesFromSelectedType[0]) {
          this.props.changeNoteType(this.props.note.ID, +this.state.type)
          break;
        }

        notesFromSelectedType[0].noteLines = [...notesFromSelectedType[0].noteLines, ...noteLinesToSave]
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

        const lastSavedNote = sortedNotes[sortedNotes.length-1]
        if (!lastSavedNote) {
          break;
        } 

        const lastDate = new Date(lastSavedNote.createdAt)
        const currentDate = new Date()


        // if it's from the same day -> merge
        if (lastDate.getDate() === currentDate.getDate() && lastDate.getMonth() === currentDate.getMonth() && lastDate.getFullYear() === currentDate.getFullYear()) {
          lastSavedNote.noteLines = [...lastSavedNote.noteLines, ...noteLinesToSave]
          this.props.mergeNotes(lastSavedNote.ID, lastSavedNote.noteLines)
          this.props.deleteNote(this.props.patientId, this.props.note.ID)
        }
        // if it's not from the same day -> get important lines, add them to this note and do nothing 
        else {
          const importantLines = lastSavedNote.noteLines.map(noteLineId => this.props.getNoteLineObj(noteLineId)).filter(noteLine => noteLine.important.set).map(noteLine => noteLine.ID);

          this.props.note.noteLines = [...importantLines, ...noteLinesToSave]
          this.props.mergeNotes(this.props.note.ID, this.props.note.noteLines)
        }
        break;
      default:
        break;
    }

    this.setState({type: '0', canAllocateFocus: true, hasFocus: false})
    this.props.newNote(this.props.patientId)
  }

  handleSelectField(e, index, value) {
    this.setState({type: value}) 
  }

  handleClick(e) {
    this.setState({hasFocus: true})
  }

  handleKeyDown(id, index, last, e) {
    console.log('im here too')

    // handle here all the updates?! -> think of why didn't work at the beginning and/or possible disadvantages and advantages
    if (e.keyCode === 13) {
      e.preventDefault() 

      if (!last) {
        this.createNewLine(index, 'append_next')
      }
    } else if (!e.ctrlKey && !e.altKey && e.keyCode === 8 && this.props.noteLines[index].text.length === 0) {
      e.preventDefault()

      if (!last) {
        this.props.deleteLine(id, this.props.note.ID)
      }
    } 
  }

  handleChange(id, last, isEmpty, e) {
    if (isEmpty && last) {
      this.createNewLine(null, 'append_end')
    }

    console.log('selection starts: ', e.target.selectionStart)
    console.log('selection ends: ', e.target.selectionEnd)
    this.props.updateLineValue(id, e)
  }

  handleNavigation(navigateTo) {
    const { noteNumber } = this.props
    const nextNote = navigateTo === 'left' ? +noteNumber-1 : +noteNumber+1
    browserHistory.push('/patient/' + this.props.patientId + '/history/' + nextNote)
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
    var noteLines = {}
    const { type } = this.props;
    const noteLinesTotal = this.props.noteLines.length

    console.log(this.props.noteLines.length)
    if (this.props.noteLines.length < 1 || !_has(this.props.noteLines[0], 'text')) {
      return (<div></div>)
    } 

    noteLines = this.props.noteLines.map((noteLine, index) => {
      const ID = noteLine.ID
      const line = noteLine
      const last = (index === (noteLinesTotal - 1)) && type === 'new'
      const isEmpty = line.text === ''

      if (last) {
        _set(this, 'last.isEmpty', isEmpty)
      }

      return (
        <NoteLine
          noteId={this.props.note.ID}
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
    const { noteLines, type, noteNumber } = this.props 
    const title = typeValues.reduce((prev, curr) => {
      if (curr.type === type) {
        prev = curr.title
      }
      return prev;
    }, '')

    if (type !== 'new' && noteLines.length === 0) {
      return (
          <div style={{height: 532, display: 'block'}}>
            <EmptySelection text={`There are no notes of type ${title}`} />
            <NewNoteButton
              onClickDo={this.handleNewButton}
             />
          </div>
      );
    }

    return (
      <div style={{height: 570,  overflowY: 'auto', display: 'block'}}>
        <HistoryNavigation 
          show={type === 'history'}
          handleNavigation={(navigateTo) => this.handleNavigation.bind(this, navigateTo)}
          first={+noteNumber === 0}
          last={+noteNumber === this.props.numberOfNotesOfCurrentType-1}/>
        <div
          style={{margin: type === 'history' ? '1em 0 3em 6.3em' : '3em 0 3em 6.3em', display: 'inline-flex'}}
          >

          <Paper
            zDepth={2}
            style={{left: '19.2em', width: '470px', height: 'auto'}}
            onTouchTap={this.handleClick}>
            
            <NoteHeader 
              show={this.canShowHeaderAndFooter('header')}
              title={title}
              />

            <Divider />

            <div style={{padding: '1em 0', margin: '0'}}>
              {this.renderNoteLines()}
            </div>

            <Divider />

            <NoteFooter 
              show={this.canShowHeaderAndFooter('footer')}
              type={type}
              value={this.state.type}
              onChangeDo={this.handleSelectField}
              onSaveDo={() => this.saveNote()}
              />     

          </Paper>
          <NoteTimestamp 
            type={type}
            date={this.props.note && new Date(this.props.note.createdAt) || new Date()}
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
  const noteNumber = params.noteNumber || 0
  const patientId = params.patientId
  const typeFilter = params.type || 'new'
  const patientNotesFromType = getNotesByTypeFromPatient(state, patientId, typeFilter)
  var sortedNotes = patientNotesFromType

  if (patientNotesFromType.length > 1) {
    sortedNotes = patientNotesFromType.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (a.createdAt > b.createdAt) {
        return -1;
      } else {
        return 0;
      }
    })
  }
  
  const noteLines = sortedNotes[noteNumber] && getAllNoteLines(state, sortedNotes[noteNumber].ID) || []

  return {
    noteLines,
    note: sortedNotes[noteNumber] || null,
    patientId,
    noteNumber,
    numberOfNotesOfCurrentType: patientNotesFromType.length,
    getPatientNotes: () => getAllPatientNotes(state, patientId),
    getNoteLineObj: (noteLineId) => getNoteLine(state, noteLineId)
  };
}

const mapDispatchToProps = (dispatch) => { 
  return {
    createAndAppendNext: (index, noteId) => dispatch(createAndAppendNext(index, noteId)),
    createAndAppendLast: (noteId) => dispatch(createAndAppendLast(noteId)),
    deleteLine: (id, noteId) => dispatch(deleteLine(id, noteId)),
    changeNoteType: (noteId, index) => dispatch(changeNoteType(noteId, index)),
    updateLineValue: (id, e) => dispatch(updateLineValue(id, e.target.value, e.target.selectionStart, e.target.selectionEnd)),
    onImportant: (id, value) => dispatch(importantLine(id, value)),
    onHighlight: (id, value) => dispatch(highlightLine(id, value)),
    newNote: (patientId) => dispatch(newNote(patientId)),
    deleteNote: (patientId, noteId) => dispatch(deleteNote(patientId, noteId)),
    mergeNotes: (noteId, noteLines) => dispatch(mergeNotes(noteId, noteLines))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Note));