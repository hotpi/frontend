import React from 'react';

import _ from 'lodash'

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

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: [{
        ID: 1,
        text: ''
      }/*,
      {
        ID: 2,
        text: ''
      }*/],
      canAllocateFocus: false,
      hasFocus: false,
      isInArea: false,
      type: 1
    }
  }

  componentDidMount() {
    this.setState({canAllocateFocus: true});
  }

  getNewId() {
    return this.state.lines.map(line => line.ID).reduce((max, cur) => Math.max(max, cur), 0);
  }

  handleKeyDown(index, positionToInsert) {
    switch(positionToInsert) {
      case 'append_next': 
        this.setState({lines: [
          ...this.state.lines.slice(0, index+1), 
          {ID: this.getNewId()+1, text: ''},
          ...this.state.lines.slice(index+1)
        ]}); 

        this.setState({canAllocateFocus: true})
        break;
      case 'append_end':
        this.setState({lines: [
          ...this.state.lines,
          {ID:this.getNewId()+1, text: ''}
        ]});
        this.setState({canAllocateFocus: false})
        break;
      default:
        console.log('error')
    }
    
  }

  handleDeleteButton(index) {
    this.setState({lines: [
      ...this.state.lines.slice(0, index), 
      ...this.state.lines.slice(index+1)
        ]
      });
  }

  handleEmptiedLine(index) {
    if (index === this.state.lines.length - 2) {
      this.setState({lines: [
        ...this.state.lines.slice(0, this.state.lines.length - 1)
        ]

      });

      return index === this.state.lines.length - 2;
    }
    return false;
  }

  handleFocus(type) {
    switch(type) {
      case 'focus':
        this.setState({hasFocus: true});
        break;
      case 'blur':
        if (!this.state.isInArea) { 
          this.setState({hasFocus: false});
        }

        break;
      default:
        console.log('error');
    }
  }

  handleMouseOver(e) {
    this.setState({isInArea: true});
  }

  handleMouseOut(e) {
    this.setState({isInArea: false});
  }

  handleSelectChange(e, i, value) {
    this.setState({type: value});
  }

  render() {
    return (
      <div style={{height: 532,  overflowY: 'auto'}}>
        <div style={{margin: '3em 0 3em 8em', display: 'inline-flex'}} onClick={this.handleFocus.bind(this, 'blur')}>

          <Paper
            zDepth={2}
            onClick={this.handleFocus.bind(this, 'focus')}
            onBlur={this.handleFocus.bind(this, 'blur')}
            onMouseOver={this.handleMouseOver.bind(this)}
            onMouseOut={this.handleMouseOut.bind(this)}
            style={{left: '19.2em', width: '470px', height: 'auto'}}>
            <h3 style={this.state.lines.length > 1 || this.state.hasFocus || this.props.type !== "New" ? titleArea.visible : titleArea.hidden }>{this.props.title}</h3>
            <Divider />
            <div style={{padding: '1em 0', margin: '0'}}>
              {this.state.lines.map((line, i) => {
                 return <NoteLine 
                  key={line.ID} 
                  last={(i === (this.state.lines.length - 1)) }
                  appendNewLineEnd={this.handleKeyDown.bind(this, i, 'append_end')} 
                  appendNewLineNext={this.handleKeyDown.bind(this, i, 'append_next')} 
                  deleteLastLine={this.handleEmptiedLine.bind(this, i)}
                  canGetFocus={this.state.canAllocateFocus} 
                  deleteLine={this.handleDeleteButton.bind(this, i)} 
                  line={line}/>;
                })}
            </div>

            <Divider />
            <div style={this.state.lines.length > 1 || this.state.hasFocus || this.props.type !== "New" ? actionsArea.visible : actionsArea.hidden}>
              <SelectField 
                value={this.state.type}
                onChange={this.handleSelectChange.bind(this)} 
                errorText={this.state.type === 1 && 'Please select one'}
                style={{width: 210, paddingTop: 3, marginRight: 100, display: this.props.type !== "New" ? 'none' : 'block' }}>
                  <MenuItem value={1} primaryText="Select the note's type" />
                  <MenuItem value={2} primaryText="Diagnosis" />
                  <MenuItem value={3} primaryText="History entry" />
                  <MenuItem value={4} primaryText="ToDo entry" />
              </SelectField>
              <RaisedButton
                style={{position: 'relative', marginTop: 15, marginBottom: 15, marginLeft: this.props.type !== "New" ? 300 : 0}}
                label="Save"
                primary={true}
                icon={<ActionDone />} />
            </div>

          </Paper>
          <Paper  
            zDepth={1}
            style={{width: 120, height: 40, marginLeft: 1, display: this.props.type === "History" ? 'inline-flex': 'none'}}>
            <DeviceAccessTime style={{color: 'grey', height: 24, width: 24, marginLeft: 10, marginTop: 10}}/><h3 style={{padding: 12, margin: 0, textAlign: 'center', fontWeight: 100}}>Today</h3>
          </Paper>
        </div>
      </div>
    );
  }
};

Note.defaultProps = {
  title: 'New note'
} 