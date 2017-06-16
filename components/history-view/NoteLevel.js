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

import {
  getAllNoteLines,
  getNotesByTypeFromPatient,
  filterOperations
} from '../../reducers';

class NoteLevel extends Component {
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
            {this.props.operations.map(operation => {

              let change = (
                <div style={{
                  backgroundColor: operation.operation.type === 'insert' ? 'green' : 'red',
                  display: 'block',
                  height: 50,
                  width: '100%',
                  color: 'white',
                  fontSize: 18
                }}>
                  {_has(operation.operation.node, 'text') ? operation.operation.node.text : null }
                </div>
                );

              console.log('hier')
              return (
                <div>
                  {change}
                  {JSON.stringify(operation, null, 4)} 
                  <br/>
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

  console.log('operations::', operations)
  operations = _groupBy(operations, `operation.action.NoteLineID`)
  operations = _objectValues(operations)
  operations = _sortBy(operations, (array) => {
    return array[0].revisionNr
  });
  operations = operations.reduce((prev, currentArray) => {
    return _concat(prev, currentArray);
  }, []);
  console.log('operations::', operations)
  return {
    operations
  };
};

export default withRouter(connect(mapStateToProps)(NoteLevel));
