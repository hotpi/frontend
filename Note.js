import React from 'react';
import { connect } from 'react-redux';

import { get as _get } from 'lodash';

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
} from './actions/noteLines';

import {
  canAllocateFocus,
  cannotAllocateFocus,
  gainedFocus,
  lostFocus,
  changeNoteType,
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
  }

  componentDidMount() {
    this.setState({canAllocateFocus: true});
  }

  isNoteLineEmpty() {
    if (this.props.noteLinesIds.length < 1) {
      return false;
    }
    console.log(this.props.noteLines);
    return this.props.noteLines[0].noteLine.text === '';
  }

  canShowHeaderAndFooter() {
    return this.props.noteLinesIds.length > 1 || this.state.hasFocus || !this.isNoteLineEmpty() || this.props.type !== "New"
  }

  handleKeyDown(index, positionToInsert, id) {
    switch(positionToInsert) {
      case 'append_next': 
        this.props.createAndAppendNext(id, index);
        this.setState({canAllocateFocus: true});
        break;
      case 'append_end':
        this.props.createAndAppendLast(id);
        this.setState({canAllocateFocus: false});
        break;
      default:
        console.log('error')
    }    
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
            style={{left: '19.2em', width: '470px', height: 'auto'}}>
            
            <NoteHeader 
              show={this.canShowHeaderAndFooter()}
              title={title}
              />

            <Divider />

            <div style={{padding: '1em 0', margin: '0'}}>
              {this.props.noteLines.map((noteLine, index) => {
                const ID = noteLine.ID;
                const line = noteLine.noteLine

                return <NoteLine
                  key={ID} 
                  last={(index === (this.props.noteLinesIds.length - 1)) }
                  isEmpty={line.text === ''}
                  type={type}
                  ID={ID}
                  appendNewLineEnd={this.handleKeyDown.bind(this, index, 'append_end', ID)} 
                  appendNewLineNext={this.handleKeyDown.bind(this, index, 'append_next', ID)} 
                  canGetFocus={this.state.canAllocateFocus} 
                  deleteLine={() => this.props.deleteLine(ID, index)}
                  {...line}/>;
              })}
            </div>

            <Divider />

            <NoteFooter 
              show={this.canShowHeaderAndFooter()}
              type={type}
              onChangeDo={(e, i, value) => store.dispatch(changeNoteType(i))}
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
    createAndAppendNext: (id, index) => dispatch(createAndAppendNext(id, index)),
    createAndAppendLast: (id) => dispatch(createAndAppendLast(id)),
    deleteLine: (id, index) => dispatch(deleteLine(id, index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);