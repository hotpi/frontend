import React from 'react';

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
  componentDidMount() {
    const { store } = this.context; 

    store.dispatch(canAllocateFocus());
    this._unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleKeyDown(index, positionToInsert) {
    const { store } = this.context; 

    switch(positionToInsert) {
      case 'append_next': 
        store.dispatch(createAndAppendNext(index));
        store.dispatch(canAllocateFocus());
        break;
      case 'append_end':
        store.dispatch(createAndAppendLast());
        store.dispatch(cannotAllocateFocus());
        break;
      default:
        console.log('error')
    }    
  }

  handleFocus(type) {
    const { store } = this.context; 

    switch(type) {
      case 'blur':
        if (store.getState().note.isInArea) { 
          store.dispatch(lostFocus());
        }

        break;
      default:
        console.log('error');
    }
  }

  render() {
    const { type, title } = this.props; // TODO: Title can be get from the type, no need to pass it down
    const { store } = this.context; 

    return (
      <div style={{height: 532,  overflowY: 'auto'}}>
        <div style={{margin: '3em 0 3em 8em', display: 'inline-flex'}}>

          <Paper
            zDepth={2}
            onClick={() => store.dispatch(gainedFocus())}
            style={{left: '19.2em', width: '470px', height: 'auto'}}>
            
            <NoteHeader 
              noteLines={store.getState().noteLines.length - 1}
              hasFocus={store.getState().note.hasFocus}
              type={type}
              title={title}
              />

            <Divider />

            <div style={{padding: '1em 0', margin: '0'}}>
              {store.getState().noteLines.map((line, index) => {
                 return <NoteLine
                  key={line.ID} 
                  last={(index === (store.getState().noteLines.length - 1)) }
                  appendNewLineEnd={this.handleKeyDown.bind(this, index, 'append_end')} 
                  appendNewLineNext={this.handleKeyDown.bind(this, index, 'append_next')} 
                  canGetFocus={store.getState().note.canAllocateFocus} 
                  deleteLine={() => store.dispatch(deleteLine(index))}
                  {...line}/>;
                })}
            </div>

            <Divider />

            <NoteFooter 
              noteLines={store.getState().noteLines.length}
              hasFocus={store.getState().note.hasFocus}
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