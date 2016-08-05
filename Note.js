import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

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

export default class Note extends React.Component {
  constructor() {
    super();
    this.state = {
      canAllocateFocus: false,
      hasFocus: false,
      isInArea: false,
    }
  }

  componentDidMount() {
    const { store } = this.context; 

    this.setState({canAllocateFocus: true});
    this._unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  isNoteLineEmpty() {
    const { store } = this.context;

    if (store.getState().noteLines.length < 1) {
      return false;
    }

    return store.getState().noteLines[0].isEmpty;
  }

  canShowHeaderAndFooter() {
    const { store } = this.context;

    return store.getState().noteLines.length > 1 || this.state.hasFocus || !this.isNoteLineEmpty() || type !== "New"
  }

  handleKeyDown(index, positionToInsert) {
    const { store } = this.context; 

    switch(positionToInsert) {
      case 'append_next': 
        store.dispatch(createAndAppendNext(index));
        this.setState({canAllocateFocus: true});
        break;
      case 'append_end':
        store.dispatch(createAndAppendLast());
        this.setState({canAllocateFocus: false});
        break;
      default:
        console.log('error')
    }    
  }

  render() {
    const { type, title } = this.props; // TODO: Title can be get from the type, no need to pass it down
    const { store } = this.context; 

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
              {store.getState().noteLines.map((line, index) => {
                return <NoteLine
                  key={line.ID} 
                  last={(index === (store.getState().noteLines.length - 1)) }
                  isEmpty={line.text === ''}
                  type={type}
                  appendNewLineEnd={this.handleKeyDown.bind(this, index, 'append_end')} 
                  appendNewLineNext={this.handleKeyDown.bind(this, index, 'append_next')} 
                  canGetFocus={this.state.canAllocateFocus} 
                  deleteLine={() => store.dispatch(deleteLine(index))}
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

Note.contextTypes = {
  store: React.PropTypes.object
}

Note.defaultProps = {
  title: 'New note',
  type: 'New'
} 