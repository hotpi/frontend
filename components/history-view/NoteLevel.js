import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  has as _has,
  concat as _concat,
  groupBy as _groupBy,
  valuesIn as _objectValues,
  sortBy as _sortBy
} from 'lodash';


import NoteLine from '../content/noteline/NoteLine';

import {
  getNoteLine,
  getAllNoteLines,
  getNotesByTypeFromPatient,
  filterOperations
} from '../../reducers';

import {
  red300,
  lightGreen300
} from 'material-ui/styles/colors';

class NoteLevel extends Component {
  constructor(props) {
    super(props);
    this.lastHighlightValue = null;
    this.lastImportanceValue = null;    
  }

  changeViewTemplate(styleExtension, operation, currentIndex, operations) {
    let style = {
      display: 'block',
      height: 50,
      width: '100%',
      color: 'white',
      fontSize: 18,
      ...styleExtension
    };
    
    let templateHeader = '';
    let template = null;

    if (operation.action.type === 'DELETE_LINE') {
      templateHeader = 'NoteLine deleted';
    } else if (operation.action.type === 'CREATE_AND_APPEND_LAST' || operation.action.type === 'CREATE_AND_APPEND_NEXT') {
      templateHeader = 'New NoteLine';
    }

    if (operation.action.type === 'DELETE_LINE' || operation.action.type === 'CREATE_AND_APPEND_LAST' || operation.action.type === 'CREATE_AND_APPEND_NEXT') {
      template = (
        <div>
          {templateHeader}
          <br/>
          {'ID: ' + operation.action.NoteLineID} 
          <br/>
          {'Time: ' + operation.action.NoteLineID} 
          <br/>
          {'By: ' + operation.action.NoteLineID} 
        </div>
      );
    } else if (operation.action.type === 'UPDATE_LINE_VALUE') {
      const { position, opType } = operation.action;
      const lastOperation = operations[currentIndex - 1].operation;

      template = opType === 'insert' ? (
        <div>
          {'text: '} 
          { operation.action.text.slice(0, position - 1) }
          <span style={{backgroundColor: lightGreen300}}>{operation.node}</span>
          { operation.action.text.slice(position) }
          <br />
          {'highlight: '} {JSON.stringify(this.lastHighlightValue)}
          <br />
          {'important: '} {JSON.stringify(this.lastImportanceValue)}
        </div>
      ) :
      (
        <div>
          {'text: '} 
          { lastOperation.action.text.slice(0, position) }
          <span style={{backgroundColor: red300}}>
            { lastOperation.action.text[position] }
          </span>
          { lastOperation.action.text.slice(position + 1) }
          <br />
          {'highlight: '} {JSON.stringify(this.lastHighlightValue)}
          <br />
          {'important: '} {JSON.stringify(this.lastImportanceValue)}
        </div>
      );
    }

    return template;
  }

  formatChangeView(operation, currentIndex, operations) {
    const { type } = operation.action;
    let styleExtension = {};
    switch (type) {
    case 'CREATE_AND_APPEND_LAST':
    case 'CREATE_AND_APPEND_NEXT':
      console.log('CREATE_AND_APPEND_*::', operation)
      this.lastHighlightValue = operation.node.highlight;
      this.lastImportanceValue = operation.node.important;
      styleExtension = { backgroundColor: lightGreen300 };
      return (
        this.changeViewTemplate(styleExtension, operation)
      );
    case 'DELETE_LINE':
      console.log('DELETE_LINE::', operation)
      styleExtension = { backgroundColor: red300 };

      return (
        this.changeViewTemplate(styleExtension, operation)
      );
    case 'UPDATE_LINE_VALUE':
      styleExtension = { backgroundColor: lightGreen300 };

      console.log('UPDATE_LINE_VALUE::', operation)

      return (
        this.changeViewTemplate(styleExtension, operation, currentIndex, operations)
      );
    default:
      // children = _has(operation.operation.node, 'text') ? operation.operation.node.text : null;
      return (
        this.changeViewTemplate(null, operation)
      );
    }
  }

  render() {
    return (
        <div style={{
          overflow: 'hidden'
        }}>
          <div style={{
            height: this.props.height,
            overflow: 'scroll',
            position: 'absolute'
          }}>
            {this.props.operations.map((operation, currentIndex, operations) => {
              let change = this.formatChangeView(operation.operation, currentIndex, operations);

              return (
                <div>
                  {change}
                  {JSON.stringify(operation, null, 4)}
                  <br/>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
    );
  }
}

NoteLevel.propTypes = {
  operations: PropTypes.array,
  height: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps;
  const patientId = params.patientId;
  const typeFilter = params.type || 'new';
  const patientNotesFromType = getNotesByTypeFromPatient(state, patientId, typeFilter);
  const noteOperations = filterOperations(state, 2, patientNotesFromType[0].ID);
  let operations = noteOperations;
  const noteLines = patientNotesFromType[0] &&
    getAllNoteLines(state, patientNotesFromType[0].ID);
  noteLines.map(noteLine => {
    operations = _concat(operations, filterOperations(state, 3, noteLine.ID));
  });

  operations = _groupBy(operations, 'operation.action.NoteLineID');
  operations = _objectValues(operations);
  operations = _sortBy(operations, (array) => {
    return array[0].revisionNr;
  });
  operations = operations.reduce((prev, currentArray) => {
    return _concat(prev, currentArray);
  }, []);

  return {
    operations,
    getNoteLine: (noteLineId) => getNoteLine(state, noteLineId)
  };
};

export default withRouter(connect(mapStateToProps)(NoteLevel));
