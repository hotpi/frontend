/**
 * Note component that contains
 * {@link NoteFooter}, {@link NoteHeader}, {@link NoteLine}, {@link NewNoteButton}
 * and {@link EmptySelection}
 * This component serves as the container of information.
 * @copyright Juan Cabello
 * @license GPLv3
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';

import {
  has as _has,
  set as _set,
  forOwn as _forOwn
} from 'lodash';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import NoteLine from '../noteline/NoteLine';
import NoteFooter from './NoteFooter';
import NoteHeader from './NoteHeader';
import NewNoteButton from '../top-view/NewNoteButton';
import EmptySelection from '../../helpers/EmptySelection';

import {
  createAndAppendNext,
  createAndAppendLast,
  deleteLine,
  updateLineValue,
  importantLine,
  highlightLine
} from '../../../actions/noteLines';

import {
  changeNoteType,
  newNoteAndLine,
  deleteNote,
  mergeNotes
} from '../../../actions/note';

import {
  allowFocusChange,
  focusChanged,
  updateCursorPosition
} from '../../../actions/cursor';

import {
  getFocusedNoteLine,
  getAllNoteLines,
  getNotesByTypeFromPatient,
  getAllPatientNotes,
  getNoteLine,
  getCursorPosition,
  isFocusChangeAllowed
} from '../../../reducers';

import { typeValues } from '../../helpers/Helpers';
import { connectionMonitor } from '../../../index';

class Note extends Component {
  /**
   * Initializes state, global variables and binds callbacks.
   *
   * @constructor
   * @param {object} props the props object
   */
  constructor(props) {
    super(props);
    this.state = {
      canAllocateFocus: false,
      hasFocus: false,
      type: '' + typeValues.map(typeObj => typeObj.type).indexOf(props.type),
      totalNoteHeight: 0,
      connectionStatus: 'up'
    };

    // the ID of the last noteline in the list
    this.lastNoteLine = '';
    // heights of all the notelines
    this.heights = [];
    // left-most cursor position
    this.selStart = 0;
    // right-most cursor position
    this.selEnd = 0;
    this.isDelete = false;
    // callback for clicking inside the note
    this.handleClick = this.handleClick.bind(this);
    // callback for clicking on the new button
    this.handleNewButton = this.handleNewButton.bind(this);
    // callback for text input on notelines
    this.handleChange = this.handleChange.bind(this);
    // callback for changes in the select field
    this.handleSelectField = this.handleSelectField.bind(this);

    // listener for connection changes
    this.disconnectListener = connectionMonitor.listenToEvent(
      'disconnected',
      [ this.connectionStatusChanged.bind(this, 'disconnected') ]
      );
    // listener for connection changes
    this.reconnectListener = connectionMonitor.listenToEvent(
      'reconnected',
      [ this.connectionStatusChanged.bind(this, 'reconnected') ]
      );
  }

  /**
   * Lifecycle hook method that creates a new note and line when no note is loaded
   * right when the component is being mounted.
   *
   * @return {null} No return value.
   * @see https://facebook.github.io/react/docs/react-component.html#componentwillmount
   */
  componentWillMount() {
    if (this.props.type === 'new' && this.props.note === null) {
      this.props.newNoteAndLine(this.props.patientId);
    }
    return null;
  }

  /**
   * Lifecycle hook method that allows the input's focus to be set and calculates
   * the total height available in the current window right after the component has been
   * mounted.
   *
   * @return {null} No return value.
   * @see https://facebook.github.io/react/docs/react-component.html#componentdidmount
   */
  componentDidMount() {
    this.props.allowFocusChange(true);
    this.calculateTotalHeight();
  }

  /**
   * Lifecycle hook method that determines whether the component should be updated.
   * It overrides the standard behaviour that updates the component on every change.
   *
   * @param   {object} nextProps - new properties received.
   * @param   {object} nextState - new state received.
   * @return  {boolean} true when it should be updated; false otherwise.
   * @see https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate
   */
  shouldComponentUpdate(nextProps, nextState) {
    return _has(this.props, 'note.ID') !== _has(nextProps, 'note.ID') ||
    this.props.noteLines.length !== nextProps.noteLines.length ||
    this.props.type !== nextProps.type ||
    this.state.hasFocus !== nextState.hasFocus ||
    this.state.type !== nextState.type ||
    this.props.width !== nextProps.width ||
    this.props.height !== nextProps.height ||
    this.state.totalNoteHeight !== nextState.totalNoteHeight ||
    this.state.connectionStatus !== nextState.connectionStatus;
  }

  /**
   * Changes connectionStatus property of the state when connection's status change detected
   *
   * @param   {string}   event   type of triggered event
   * @return  {null}  Nothing is returned
   */
  connectionStatusChanged(event) {
    this.setState({
      connectionStatus: (event === 'disconnected' ? 'down' : 'up')
    });

    return null;
  }

  /**
   * Checks whether the noteline is empty or not.
   *
   * @return {boolean} true if it's empty; false otherwise
   */
  isNoteLineEmpty() {
    if (this.props.noteLines.length < 1 || !_has(this.props.noteLines[0], 'text')) {
      return false;
    }

    return this.props.noteLines[0].text === '';
  }

  /**
   * Checks whether footer and/or header can be shown.
   *
   * @param  {string}   part  either header or footer
   * @return {boolean}  true if it can be shown; false otherwise
   */
  canShowHeaderAndFooter(part) {
    if (part === 'header') {
      return this.props.noteLines.length > 1 ||
      this.state.hasFocus ||
      !this.isNoteLineEmpty() ||
      this.props.type !== 'new';
    }

    return (this.props.noteLines.length > 1 ||
      this.state.hasFocus ||
      !this.isNoteLineEmpty()) &&
    this.props.type === 'new';
  }

  /**
   * Dispatches a Redux action to create a new line.
   *
   * @param   {number}  index             noteline's index
   * @param   {string}  positionToInsert  either next to a noteline or at the end
   * @return  {null}                      nothing is returned
   */
  createNewLine(index, positionToInsert) {
    switch (positionToInsert) {
    case 'append_next':
      this.props.createAndAppendNext(index + 1, this.props.note.ID);
      break;
    case 'append_end':
      this.props.createAndAppendLast(this.props.note.ID);
      break;
    default:
      throw new Error('New Line could not be created');
    }

    return null;
  }

  /**
   * Holds the save logic of a note.
   * 1. Merges notelines into the existing note of the same type
   * 2. Deletes the current note
   * 3. Resets state of the current component
   * 4. Creates a new note with its corresponding line.
   *
   * @return {null|alert} Alert if type has not been set; otherwise no return value.
   */
  saveNote() {
    if (this.state.type === '0') {
      // TODO: Deliver a prettier alert
      // eslint-disable-next-line no-alert
      return alert('Type must me set');
    }

    _forOwn(this.props.noteLines, (value) => {
      if (value.text === '') {
        this.props.deleteLine(value.ID, this.props.note.ID);
      }
    });

    const notesFromSelectedType = this.props.getPatientNotes()
      .filter(note => {
        return note.type === typeValues[+this.state.type].type;
      });

    const noteLinesToSave = this.props.noteLines
      .filter(noteLine => {
        return noteLine.text !== '';
      })
      .map(noteLine => noteLine.ID);

    if (!notesFromSelectedType[0]) {
      this.props.changeNoteType(this.props.note.ID, +this.state.type);
    }

    notesFromSelectedType[0].noteLines = [
      ...notesFromSelectedType[0].noteLines,
      ...noteLinesToSave
    ];

    this.props.mergeNotes(notesFromSelectedType[0].ID, notesFromSelectedType[0].noteLines);
    this.props.deleteNote(this.props.patientId, this.props.note.ID);

    this.setState({ type: '0', hasFocus: false });
    this.props.newNoteAndLine(this.props.patientId);

    return null;
  }

  /**
   * Changes the note's type of the state.
   *
   * @param {SyntheticEvent} e - React's SyntheticEvent
   * @param {number} index - index of the selected field
   * @param {number} value - value of the selected field
   * @return {null} No return value.
   */
  handleSelectField(e, index, value) {
    this.setState({ type: value });
  }

  /**
   * Captures when the note is being focused which makes a difference to show header and footer
   *
   * @return {null} No return value
   */
  handleClick() {
    this.setState({ hasFocus: true });
  }

  /**
   * Captures the event of pressing a key to either delete a line or add a new one
   * depending on the key pressed.
   *
   * @param {string} id - noteline's ID
   * @param {number} index - position of the current noteline
   * @param {boolean} last - whether is the last noteline of the note
   * @param {SyntheticEvent} e - React's SyntheticEvent object
   * @return {null} No return value
   */
  handleKeyDown(id, index, last, e) {
    this.isDelete = false;

    if (e.keyCode === 13) {
      // enter key has been pressed
      e.preventDefault();

      if (!last) {
        this.createNewLine(index, 'append_next');
      }
    } else if (!e.ctrlKey &&
      !e.altKey &&
      (e.keyCode === 8 || e.keyCode === 46)
      &&
      this.props.noteLines[index].text.length !== 0) {
      // backspace or delete without alt or control key pressed and noteline is not empty
      this.isDelete = true;
    } else if (!e.ctrlKey &&
      !e.altKey &&
      e.keyCode === 8 &&
      this.props.noteLines[index].text.length === 0) {
      // backspace without alt or control key pressed and noteline is empty
      e.preventDefault();

      if (!last) {
        // set's note line height to 0
        // TODO: double check whether there is a more elegant way to do this
        this.heights.filter((line) => line.ID === id)[0].height = 0;
        this.calculateTotalHeight();

        // if it's the last noteline it shoudn't be deleted as it would make the note unusable
        this.props.deleteLine(id, this.props.note.ID);
      }
    }
  }

  /**
   * Dispatches a Redux action to update the noteline's text and if it's the last
   * noteline it will create a new one
   *
   * @param {string} id - noteline's id
   * @param {boolean} last - whether is the last note's noteline
   * @param {boolean} isEmpty - whether the noteline's text is empty
   * @param {SyntheticEvent} e - React's SynthethicEvent object
   * @return {null} No return value
   */
  handleChange(id, last, isEmpty, e) {
    if (isEmpty && last) {
      this.createNewLine(null, 'append_end');
    }

    this.props.updateLineValue(id, this.isDelete ? 'delete' : 'insert', e);
  }

  /**
   * Handles the navigation between the different history's note type.
   *
   * @deprecated not used anymore and will be removed in the next version
   * @param {string} navigateTo - left or right which navigates through time of creation
   * @return {null} No return value
   */
  handleNavigation(navigateTo) {
    const { noteNumber } = this.props;
    const nextNote = navigateTo === 'left' ?
    +noteNumber - 1 :
    +noteNumber + 1;
    browserHistory.push('/patient/' + this.props.patientId + '/history/' + nextNote);
  }

  /**
   * Handles the pressing of the new note button.
   *
   * @return {null} No return value
   */
  handleNewButton() {
    this.props.newNoteAndLine(this.props.patientId);
    browserHistory.push('/patient/' + this.props.patientId + '/new');
  }

  /**
   * Handles the line modifiers which at the moment are highlighting and setting as important.
   *
   * @param {string} id - noteline's id
   * @param {string} type - type of line modifier
   * @param {SyntheticEvent} e - React's Synthetic Event object
   * @param {number} value - value of the selected modifier
   * @return {null} No return value
   */
  lineModifierHandler(id, type, e, value) {
    switch (type) {
    case 'onImportant':
      return this.props.onImportant(id, value);
    case 'onHighlight':
      return this.props.onHighlight(id, value);
    default:
      return null;
    }
  }

  /**
   * Handles the change of height caused by an increase in the input's height
   *
   * @param {number} index - noteline's position
   * @param {string} noteLineId - noteline's id
   * @param {number} newHeight - new height of the noteline
   * @return {null} No return value
   */
  handleChangeOfHeight(index, noteLineId, newHeight) {
    // console.log(newHeight)
    if (index < this.props.noteLines.length - 1 || this.props.type !== 'new') {
      // console.log('adding upper margin');
      // upper margin and buttons and padding
      newHeight = newHeight + 13 + (this.props.focusedNoteLine === noteLineId ? 30 : 0);
    } else if (index === this.props.noteLines.length - 1) {
      newHeight = newHeight + 10;
    }

    // console.log('at handleChangeOfHeight', newHeight, this.heights)
    this.heights.filter(line => line.ID === noteLineId)[0].height = newHeight;
    this.calculateTotalHeight();
  }

  /**
   * Recalculates the total height of the noteline's area by summing each noteline's height
   *
   * @return {null} No return value
   */
  calculateTotalHeight() {
    // console.log('>>>>>> heights array', this.heights)
    this.setState({
      // notelines' heights
      totalNoteHeight: this.heights.reduce((prev, current) => {
        return prev + current.height;
      }, 0)
      // upper padding
      + 10
      // bottom padding
      + 10
    });
  }

  /**
   * Captures when a noteline received focus to show its modifier options
   *
   * @param {string} noteLineId - noteline's ID
   * @return {null} No return value
   */
  handleNoteLineFocus(noteLineId) {
    if (noteLineId !== this.lastNoteLine) {
      this.heights.filter((line) => line.ID === noteLineId)[0].height =
        this.heights.filter((line) => line.ID === noteLineId)[0].height + 30;
    }

    if (this.props.focusedNoteLine !== '' && this.props.focusedNoteLine !== this.lastNoteLine) {
      this.heights.filter((line) => line.ID === this.props.focusedNoteLine)[0].height =
        this.heights.filter((line) => line.ID === this.props.focusedNoteLine)[0].height - 30;
    }

    this.calculateTotalHeight();
    this.props.focusChanged(noteLineId);
  }

  /**
   * Handles the noteline's deletion
   *
   * @param {string} noteLineId - noteline's ID
   * @param {string} noteId - note's ID
   * @return {null} No return value
   */
  handleDelete(noteLineId, noteId) {
    this.props.deleteLine(noteLineId, noteId);
    // is there a better way?
    this.heights.filter((line) => line.ID === noteLineId)[0].height = 0;
    this.calculateTotalHeight();
  }
  /**
   * Getter for the cursor position
   *
   * @return {int} The cursor position on a current line
   */
  getCursorPosition() {
    return this.props.cursorPosition;
  }

  /**
   * Getter for the connection status text
   *
   * @param {string} status - connection status
   * @return {string} text corresponding to the connection status
   */
  getConnectionStatusText(status) {
    switch (status) {
    case 'up':
      return 'All changes are saved online.';
    case 'down':
      return 'All changes are saved locally.';
    default:
      return 'All changes are saved.';
    }
  }

  /**
   * Getter for getting the height value of the header depending on current state
   *
   * @return {number} height value of the header
   */
  getHeaderHeight() {
    return this.canShowHeaderAndFooter('header') ?
    60 :
    0;
  }

  /**
   * Getter for getting the height value of the footer depending on current state
   *
   * @return {number} height value of the footer
   */
  getFooterHeight() {
    return this.canShowHeaderAndFooter('footer') ?
    75 :
    0;
  }

  /**
   * Holds the logic of rendering the different notelines.
   *
   * @return {null|array} Null if no notelines, array of notelines components
   */
  renderNoteLines() {
    let noteLines = {};
    const { type } = this.props;
    const noteLinesTotal = this.props.noteLines.length;

    if (this.props.noteLines.length < 1 || !_has(this.props.noteLines[0], 'text')) {
      return null;
    }

    noteLines = this.props.noteLines.map((noteLine, index) => {
      const ID = noteLine.ID;
      const last = (index === (noteLinesTotal - 1)) && type === 'new';
      const isEmpty = noteLine.text === '';

      if (this.heights.filter(line => line.ID === ID).length === 0) {
        this.heights.push({ ID, height: 0 });
      }

      if (last) {
        this.lastNoteLine = ID;
        _set(this, 'last.isEmpty', isEmpty);
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
          canGetFocus={this.props.canAllocateFocus}
          onFocusDo={this.handleNoteLineFocus.bind(this, ID)}
          deleteLine={this.handleDelete.bind(this, ID, this.props.note.ID)}
          onImportant={this.lineModifierHandler.bind(this, ID, 'onImportant')}
          onHighlight={this.lineModifierHandler.bind(this, ID, 'onHighlight')}
          onChangeOfHeightDo={this.handleChangeOfHeight.bind(this, index, ID)}
          updateCursorPosition={this.props.updateCursorPosition.bind(this)}
          cursorPosition={this.getCursorPosition.bind(this)}
        />
      );
    });

    return noteLines;
  }

  /**
   * Render method of the component
   *
   * @return {node} React Component
   */
  render() {
    const { noteLines, type } = this.props;

    const title = typeValues.reduce((prev, curr) => {
      if (curr.type === type) {
        prev = curr.title; // eslint-disable-line
      }

      return prev;
    }, '');

    if (type !== 'new' && noteLines.length === 0) {
      return (
          <div style={{
            height: 532, display: 'block'
          }}
          >
            <EmptySelection text={`There are no notes of type ${title}`} />
            <NewNoteButton
              onClickDo={this.handleNewButton}
             />
          </div>
      );
    }

    let minHeightNoteLinesArea = this.heights.filter((height) => height.height > 0)[0] ?
    this.heights.filter((height) => height.height > 0)[0].height :
    0;

    if (minHeightNoteLinesArea === 22) {
      // 40 might be related to the line options area which now is 30px big
      minHeightNoteLinesArea = minHeightNoteLinesArea +
      10 +
      (this.props.focusedNoteLine !== '' ? 30 : 0);
    }

    let minHeightNoteAreaMobile = this.props.focusedNoteLine !== '' &&
    this.props.focusedNoteLine !== this.lastNoteLine ?
    287 :
    257;

    let minHeightNoteAreaTabletOrBigger = this.state.totalNoteHeight +
    this.getFooterHeight() +
    this.getHeaderHeight();

    // console.log('minHeight:', minHeight, this.state.totalNoteHeight)
    return (
      <div className="columns row"
          style={{
            height: this.props.height, maxWidth: '100%', margin: 0, overflowY: 'hidden'
          }}
      >
         <div
          className="columns row small-collapse"
          style={{
            margin: '1em 4em 3em 4em',
            display: 'block'
          }}
          >
          <h3 style={{
            fontWeight: 100,
            fontSize: 14,
            color: 'grey',
            padding: '0',
            textAlign: 'center',
            height: 'auto',
            marginTop: 0,
            marginBottom: 5
          }}
          >{this.getConnectionStatusText(this.state.connectionStatus)}</h3>
          <Paper
            zDepth={2}
            // eslint-disable-next-line 
            className="small-12 large-12 small-centered large-centered columns" // TODO: shrink me
            style={{
              overflow: 'hidden',
              margin: 0,
              height: Math.max(minHeightNoteLinesArea,
                this.state.totalNoteHeight + this.getFooterHeight() + this.getHeaderHeight()
              ),
              minHeight: this.props.height * 0.6 < minHeightNoteAreaTabletOrBigger ?
              minHeightNoteAreaMobile :
              minHeightNoteAreaTabletOrBigger,
              maxHeight: this.props.height - 185
            }}
            onTouchTap={this.handleClick}>

            <NoteHeader
              show={this.canShowHeaderAndFooter('header')}
              title={title}
              />

            <Divider />

            <div style={{
              position: 'relative',
              overflow: 'auto',
              minHeight: minHeightNoteLinesArea,
              maxHeight: Math.max(
                minHeightNoteLinesArea,
                this.props.height - 185 - this.getHeaderHeight() - this.getFooterHeight()
              )
            }}
            >
              <div style={{
                padding: '10px 0 ' + (noteLines.length > 1 ? '0' : '10px') + ' 0',
                margin: '0',
                height: this.state.totalNoteHeight,
                overflowY: 'scroll'
              }}
              >
                {this.renderNoteLines()}
              </div>
            </div>

            <Divider
              style={ {
                display: (this.canShowHeaderAndFooter('footer') ? 'inherit' : 'none')
              } }
            />

            <NoteFooter
              show={this.canShowHeaderAndFooter('footer')}
              type={type}
              value={this.state.type}
              onChangeDo={this.handleSelectField}
              onSaveDo={() => this.saveNote()}
              />

          </Paper>
        </div>
        <NewNoteButton
          width={this.props.width}
          onClickDo={this.handleNewButton}
         />
      </div>
    );
  }
}

Note.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  // signature should be defined
  note: PropTypes.object,
  newNoteAndLine: PropTypes.func,
  canAllocateFocus: PropTypes.bool,
  cursorPosition: PropTypes.number,
  noteLines: PropTypes.array,
  patientId: PropTypes.string,
  noteNumber: PropTypes.number,
  numberOfNotesOfCurrentType: PropTypes.number,
  allowFocusChange: PropTypes.func,
  updateCursorPosition: PropTypes.func,
  deleteLine: PropTypes.func,
  focusChanged: PropTypes.func,
  onImportant: PropTypes.func,
  onHighlight: PropTypes.func,
  getPatientNotes: PropTypes.func,
  changeNoteType: PropTypes.func,
  mergeNotes: PropTypes.func,
  deleteNote: PropTypes.func,
  createAndAppendNext: PropTypes.func,
  createAndAppendLast: PropTypes.func,
  updateLineValue: PropTypes.func,
  focusedNoteLine: PropTypes.string,
  reviewMode: PropTypes.bool
};

Note.defaultProps = {
  reviewMode: false,
  title: 'New note',
  type: 'new'
};

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps;
  let operations = [];
  const cursorPosition = getCursorPosition(state);
  const canAllocateFocus = isFocusChangeAllowed(state);
  const noteNumber = params.noteNumber || 0;
  const patientId = params.patientId;
  const typeFilter = params.type || 'new';
  const patientNotesFromType = getNotesByTypeFromPatient(state, patientId, typeFilter);
  let sortedNotes = patientNotesFromType;

  // NOTE: may be not necessary anymore
  if (patientNotesFromType.length > 1) {
    sortedNotes = patientNotesFromType.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (a.createdAt > b.createdAt) {
        return -1;
      }

      return 0;
    });
  }

  const noteLines = sortedNotes[noteNumber] &&
    getAllNoteLines(state, sortedNotes[noteNumber].ID) ||
    [];
  
  return {
    canAllocateFocus,
    cursorPosition,
    noteLines,
    patientId,
    noteNumber,
    operations,
    note: sortedNotes[noteNumber] || null,
    numberOfNotesOfCurrentType: patientNotesFromType.length,
    getPatientNotes: () => getAllPatientNotes(state, patientId),
    getNoteLineObj: (noteLineId) => getNoteLine(state, noteLineId)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAndAppendNext: (index, noteId) => dispatch(createAndAppendNext(index, noteId)),
    createAndAppendLast: (noteId) => dispatch(createAndAppendLast(noteId)),
    deleteLine: (id, noteId) => dispatch(deleteLine(id, noteId)),
    changeNoteType: (noteId, index) => dispatch(changeNoteType(noteId, index)),
    // eslint-disable-next-line
    updateLineValue: (id, opType, e) => dispatch(updateLineValue(id, opType, e.target.value, e.target.selectionStart, e.target.selectionEnd)),
    onImportant: (id, value) => dispatch(importantLine(id, value)),
    onHighlight: (id, value) => dispatch(highlightLine(id, value)),
    newNoteAndLine: (patientId) => dispatch(newNoteAndLine(patientId)),
    deleteNote: (patientId, noteId) => dispatch(deleteNote(patientId, noteId)),
    mergeNotes: (noteId, noteLines) => dispatch(mergeNotes(noteId, noteLines)),
    focusChanged: (noteLineId) => dispatch(focusChanged(noteLineId)),
    updateCursorPosition: (newPosition) => dispatch(updateCursorPosition(newPosition)),
    allowFocusChange: (isAllowed) => dispatch(allowFocusChange(isAllowed))
  };
};

/*const mergeProps = (stateProps, dispatchProps, ownProps) => {
  if (ownProps.reviewMode) {
    console.log(filterOperations))
    // use a helper funciton that parses insertions and deletions
    // 
  }
}*/

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Note));
