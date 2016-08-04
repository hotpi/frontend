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


//TODO: Delete me!
import configureStore from './configureStore';
const store = configureStore();

export default class Note extends React.Component {
  componentDidMount() {
    store.dispatch({type: 'CAN_ALLOCATE_FOCUS'});
    store.subscribe(() => this.forceUpdate());
  }

  handleKeyDown(index, positionToInsert) {
    switch(positionToInsert) {
      case 'append_next': 
        store.dispatch({
          type: 'CREATE_AND_APPEND_NEXT',
          index
        });
        store.dispatch({
          type: 'CAN_ALLOCATE_FOCUS'
        });
        break;
      case 'append_end':
        store.dispatch({
          type: 'CREATE_AND_APPEND_LAST'
        });
        store.dispatch({
          type: 'CANNOT_ALLOCATE_FOCUS'
        });
        break;
      default:
        console.log('error')
    }    
  }

  handleFocus(type) {
    switch(type) {
      case 'focus':
        
        break;
      case 'blur':
        if (store.getState().note.isInArea) { 
          store.dispatch({
            type: 'LOST_FOCUS'
          });
        }

        break;
      default:
        console.log('error');
    }
  }

  render() {
    const { type, title } = this.props; // TODO: Title can be get from the type, no need to pass it down

    return (
      <div style={{height: 532,  overflowY: 'auto'}}>
        <div style={{margin: '3em 0 3em 8em', display: 'inline-flex'}}>

          <Paper
            zDepth={2}
            onClick={() => store.dispatch({type: 'GAINED_FOCUS'})}
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
                  store={store}
                  key={line.ID} 
                  last={(index === (store.getState().noteLines.length - 1)) }
                  appendNewLineEnd={this.handleKeyDown.bind(this, index, 'append_end')} 
                  appendNewLineNext={this.handleKeyDown.bind(this, index, 'append_next')} 
                  canGetFocus={store.getState().note.canAllocateFocus} 
                  deleteLine={() => store.dispatch({
                      type: 'DELETE_LINE',
                      index
                    })
                  }
                  {...line}/>;
                })}
            </div>

            <Divider />

            <NoteFooter 
              noteLines={store.getState().noteLines.length}
              hasFocus={store.getState().note.hasFocus}
              type={type}
              onChangeDo={(e, i, value) => store.dispatch({
                type: 'CHANGE_NOTE_TYPE',
                value: typeValues[i]
              })}
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

Note.defaultProps = {
  title: 'New note',
  type: 'New'
} 