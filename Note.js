import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import NoteLine from './NoteLine';

export default class Note extends React.Component {
  constructor() {
    super();

    this.state = {
      lines: [{
        ID: 1,
        text: ''
      }],
      canAllocateFocus: false
    }
  }

  componentDidMount() {
    this.setState({canAllocateFocus: true});
  }

  getNewId() {
    return this.state.lines.map(line => line.ID).reduce((max, cur) => Math.max(max, cur), 0);
  }

  handleKeyUp(index, positionToInsert) {
    switch(positionToInsert) {
      case 'append_next': 
        this.setState({lines: [
          ...this.state.lines.slice(0, index+1), 
          {ID: this.getNewId()+1, text: ''},
          ...this.state.lines.slice(index+1)
        ]}); 
        this.setState({canAllocateFocus: true})
        console.log('append_next');
        break;
      case 'append_end':
        this.setState({lines: [
          ...this.state.lines,
          {ID:this.getNewId()+1, text: ''}
        ]});
        this.setState({canAllocateFocus: false})
        console.log('append_end');
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
      console.log('lines', index, this.state.lines.length, index === this.state.lines.length - 1);
      return index === this.state.lines.length - 2;
    }
    return false;
  }

  render() {
    return (
      <div style={{height: 430,  overflowY: 'auto'}}>
        <div style={{margin: '3em 8em'}}>

          <Paper
            zDepth={2}
            style={{left: '19.2em', width: '470px', height: '430px'}}>
            <h3 style={{padding: '1em 2em', margin: '0', color: 'black', fontWeight: '200'}}>New note</h3>
            <Divider />
            <div style={{padding: '1em 0', margin: '0'}}>
              {this.state.lines.map((line, i) => {
                 return <NoteLine 
                  key={line.ID} 
                  last={(i === (this.state.lines.length - 1)) }
                  appendNewLineEnd={this.handleKeyUp.bind(this, i, 'append_end')} 
                  appendNewLineNext={this.handleKeyUp.bind(this, i, 'append_next')} 
                  deleteLastLine={this.handleEmptiedLine.bind(this, i)}
                  canGetFocus={this.state.canAllocateFocus} 
                  deleteLine={this.handleDeleteButton.bind(this, i)} 
                  line={line}/>;})}
            </div>

            <Divider />
            {/*TODO: Add note actions*/}

          </Paper>
        </div>
      </div>
    );
  }
};