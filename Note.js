import React from 'react';

import _ from 'lodash';

import { v4 } from 'node-uuid';

import { createStore, combineReducers } from 'redux';

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

import ActionDone from 'material-ui/svg-icons/action/done';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import DeviceAccessTime from 'material-ui/svg-icons/device/access-time';

import NoteLine from './NoteLine';
import { iconStyles } from './NoteLine'

const titleArea = {
  hidden: {
    display: 'none'
  },
  visible: {
    padding: '1em 2em', 
    margin: '0', 
    color: 'black', 
    fontWeight: '200'
  }
};

const actionsArea = {
  hidden: {
    display: 'none'
  },
  visible: {
    display: 'inline-flex',
    height: 65,
    padding: '0 1em 0 2em'
  }
}

const noteLine = (state = {
  ID: v4(),
  text: '',
  important: {
    set: false,
    color: "transparent",
    value: 0
  },
  highlight: {
    set: false,
    color: "transparent",
    value: 0
  },
  isEmpty: true,
  last: false
}, action ) => {
  console.log('dispatching in noteLine: ', action.type, action, state)
  switch (action.type) {
    case 'NOT_EMPTY_AND_NOT_LAST': 
      if (state.ID !== action.ID) {
        return state;
      }

      return {
          ...state,
         isEmpty: false,
         last: false
        }
    case 'CREATE_AND_APPEND_NEXT':
      return {
        ...state,
        last: false
      }
    case 'CREATE_AND_APPEND_LAST':
      return {
        ...state,
        last: true
      }
    case 'UPDATE_LINE_VALUE':
      if (state.ID !== action.ID) {
        return state;
      }

      if (action.text === '') {
        return {
          ...state,
          text: action.text,
          isEmpty: true
        }
      }

      return {
        ...state,
        text: action.text
      }
    case 'HIGHLIGHT_LINE':
      if (state.ID !== action.ID) {
        return state;
      }

      return {
        ...state,
        highlight: {
          set: +action.value !== 0,
          color: action.color,
          value: action.value
        }
      }
    case 'IMPORTANT_LINE':
      if (state.ID !== action.ID) {
        return state;
      }

      return {
        ...state,
        important: {
          set: +action.value !== 0,
          color: action.color,
          value: action.value
        }
      }
    default:
      return state
  }
}

const noteLines = (state = [{
    ID: v4(),
    text: 'asdfasdf',
    important: {
      set: false,
      color: "transparent",
      value: "0"
    },
    highlight: {
      set: false,
      color: "transparent",
      value: "0"
    },
    last: false,
    isEmpty: false
  }/*,
  {
    ID: v4(),
    text: '12312312',
    important: {
      set: false,
      color: "transparent",
      value: "0"
    },
    highlight: {
      set: false,
      color: "transparent",
      value: "0"
    },
    last: false,
    isEmpty: false
  },
  {
    ID: v4(),
    text: '',
    important: {
      set: false,
      color: "transparent",
      value: "0"
    },
    highlight: {
      set: false,
      color: "transparent",
      value: "0"
    },
    last: true,
    isEmpty: false
  }*/], action ) => {
  console.log('dispatching in noteLines: ', action.type, action, state)
  switch (action.type) {
    case 'DELETE_LINE':
      return [
      ...state.slice(0, action.index), 
      ...state.slice(action.index+1)
        ];
    case 'CREATE_AND_APPEND_NEXT':
      return [
          ...state.slice(0, action.index+1), 
          noteLine(undefined, action),
          ...state.slice(action.index+1)
        ];
    case 'CREATE_AND_APPEND_LAST':
      return [
          ...state,
          noteLine(undefined, action)
        ];
    case 'NOT_EMPTY_AND_NOT_LAST':
    case 'HIGHLIGHT_LINE':
    case 'IMPORTANT_LINE':
    case 'UPDATE_LINE_VALUE':
      return state.map(line => noteLine(line, action));
    default: 
      return state
  }
}

const note = (state = {
  canAllocateFocus: false,
  hasFocus: false,
  isInArea: false
}, action) => {
  switch(action.type) {
    case 'CAN_ALLOCATE_FOCUS':
      return {
        ...state,
        canAllocateFocus: true
      }
    case 'CANNOT_ALLOCATE_FOCUS':
      return {
        ...state,
        canAllocateFocus: false
      }
    case 'GAINED_FOCUS':
      return {
        ...state,
        hasFocus: true
      }
    case 'LOST_FOCUS':
      return {
        ...state,
        hasFocus: false
      }
    case 'IS_IN_AREA':
      return {
        ...state,
        isInArea: true
      }
    case 'IS_NOT_IN_AREA':
      return {
        ...state,
        isInArea: false
      }
    default: 
      return state
  }
}

const mainReducer = combineReducers({
  note,
  noteLines
})

const store = createStore(mainReducer);

/*store.subscribe(() =>
  console.log(store.getState())
)*/


export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 1
    }
  }

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

  handleSelectChange(e, i, value) {
    this.setState({type: value});
  }

  render() {
    const { type, title } = this.props;

    return (
      <div style={{height: 532,  overflowY: 'auto'}}>
        <div style={{margin: '3em 0 3em 8em', display: 'inline-flex'}}
           onClick={() => {
              if (!store.getState().note.isInArea) {
                return store.dispatch({type: 'LOST_FOCUS'})              
              }
            }}
           >

          <Paper
            zDepth={2}
            onClick={() => store.dispatch({type: 'GAINED_FOCUS'})}            
            onMouseOver={() => store.dispatch({type: 'IS_IN_AREA'})}
            onMouseOut={() => store.dispatch({type: 'IS_NOT_IN_AREA'})}
            style={{left: '19.2em', width: '470px', height: 'auto'}}>
            {<h3 style={store.getState().noteLines.length > 1 || store.getState().note.hasFocus || type !== "New" ? titleArea.visible : titleArea.hidden }>{title}</h3>}
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
            {<div style={store.getState().noteLines.length > 1 || store.getState().note.hasFocus || type !== "New" ? actionsArea.visible : actionsArea.hidden}>
              <SelectField 
                value={this.state.type}
                onChange={this.handleSelectChange.bind(this)} 
                errorText={this.state.type === 1 && 'Please select one'}
                style={{width: 210, paddingTop: 3, marginRight: 100, display: type !== "New" ? 'none' : 'block' }}>
                  <MenuItem value={1} primaryText="Select the note's type" />
                  <MenuItem value={2} primaryText="Diagnosis" />
                  <MenuItem value={3} primaryText="History entry" />
                  <MenuItem value={4} primaryText="ToDo entry" />
              </SelectField>
              <RaisedButton
                style={{position: 'relative', marginTop: 15, marginBottom: 15, marginLeft: type !== "New" ? 300 : 0}}
                label="Save"
                primary={true}
                icon={<ActionDone />} />
            </div>}

          </Paper>
          <Paper  
            zDepth={1}
            style={{width: 120, height: 40, marginLeft: 1, display: type === "History" || type === "ToDo" ? 'inline-flex': 'none'}}>
            <DeviceAccessTime style={{color: 'grey', height: 24, width: 24, marginLeft: 10, marginTop: 10}}/><h3 style={{padding: 12, margin: 0, textAlign: 'center', fontWeight: 100}}>Today</h3>
          </Paper>
        </div>
      </div>
    );
  }
};

Note.defaultProps = {
  title: 'New note',
  type: 'New'
} 