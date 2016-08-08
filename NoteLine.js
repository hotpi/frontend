import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import { createStore } from 'redux';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

import NoteLineOptions from './NoteLineOptions'
import CancelButton from './CancelButton'
import AddIcon from './AddIcon'
import LineText from './LineText'

import { lineOutHover, iconStyles, inlineIconStyle, importantColors, highlightColors } from './Helpers';

import { 
  updateLineValue, 
  notEmptyAndNotLast, 
  importantLine, 
  highlightLine 
} from './actions/noteLines'

export default class NoteLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canGetFocus: props.canGetFocus
    }
  }

  componentDidMount() {
    const { appendNewLineEnd, type, last, isEmpty } = this.props;

    this.setState({canGetFocus: false});  
    
    if (last && !isEmpty && type === "New") {
      appendNewLineEnd();
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();  

      if (!this.props.last) {
        this.props.appendNewLineNext();
      }
    } else if (!e.ctrlKey && !e.altKey && e.keyCode === 8 && this.props.text.length === 0) {
      e.preventDefault();

      if (!this.props.last) {
        this.props.deleteLine();
      }
    } 
  }

  handleChange(e) {
    const { last, isEmpty } = this.props;

    // TODO: Dispatch new line at the end action
    if (isEmpty && last) {
      this.props.appendNewLineEnd();
    } 

    this.props.updateLineValue(e);
  }

  handleOptions(type, e, value) {
    console.log(type, e, value);

    switch (type) {
      case 'onImportant':
        return this.props.onImportant(value);
      case 'onHighlight':
        return this.props.onHighlight(value);
    }
  }

  render() {
    const { deleteLine, last, important, highlight, ID, text, canGetFocus } = this.props
    const { store } = this.context; 

    return (
      <div className="note-line-container" style={last ? lineOutHover.last : lineOutHover.notLast}>
        <div className="line-w-button" tabIndex="0">
          <AddIcon 
            last={last} 
            />
          <LineText 
            onChangeDo={this.handleChange.bind(this)}
            onKeyDownDo={this.handleKeyDown.bind(this)}
            text={text}
            highlight={highlight}
            canGetFocus={canGetFocus}
            />
          <CancelButton 
            last={last}
            onClickDo={deleteLine}
            />          
        </div>
        <NoteLineOptions
          last={last}
          important={important}
          highlight={highlight}
          onHighlight={this.handleOptions.bind(this, 'onHighlight')}
          onImportant={this.handleOptions.bind(this, 'onImportant')}
          />        
      </div>
    );
  }
}

NoteLine.propTypes = {
  ID: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  last: React.PropTypes.bool.isRequired,
  canGetFocus: React.PropTypes.bool.isRequired,
  important: React.PropTypes.shape({
    set: React.PropTypes.bool.isRequired,
    color: React.PropTypes.any.isRequired,
    value: React.PropTypes.any.isRequired
  }).isRequired,
  highlight: React.PropTypes.shape({
    set: React.PropTypes.bool.isRequired,
    color: React.PropTypes.any.isRequired,
    value: React.PropTypes.any.isRequired
  }).isRequired,
  deleteLine: React.PropTypes.func.isRequired,
}

// TODO: Possible to set props via connect

NoteLine.contextTypes = {
  store: React.PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  const noteLine = state.noteLines.byId[ownProps.ID];
  return {
    ...ownProps,
    ...noteLine
  }

}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onHighlight: (value) => {
      dispatch(highlightLine(ownProps.ID, value))
    },
    onImportant: (value) => {
      dispatch(importantLine(ownProps.ID, value))
    },
    updateLineValue: (e) => {
      dispatch(updateLineValue(ownProps.ID, e.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteLine)