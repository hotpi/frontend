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

import NoteLineOptions from './NoteLineOptions';
import CancelButton from './CancelButton';
import AddIcon from './AddIcon';
import LineText from './LineText';

import { lineOutHover, iconStyles, inlineIconStyle, importantColors, highlightColors } from '../../helpers/Helpers';

import { getNoteLine } from '../../../reducers';

class NoteLine extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      canGetFocus: props.canGetFocus
    }
  }

  componentDidMount() {
    this.setState({canGetFocus: false})
  }

  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text || this.props.highlight !== nextProps.highlight || this.props.important !== nextProps.important;
  }

  render() {
    const { deleteLine, last, important, highlight, text, canGetFocus } = this.props

    console.log('cursor received at NoteLine component: ', this.props.cursorPosition())
    if (!this.props.noteLine) {
      return <div></div>
    }
    return (
      <div className="note-line-container" style={last ? lineOutHover.last : lineOutHover.notLast}>
        <div className="line-w-button" tabIndex="0">
          <AddIcon 
            last={last} 
            />
          <LineText 
            onChangeDo={this.props.onChangeDo} // this.props.onChangeDo
            onKeyDownDo={this.props.keyDownHandler} // this.props.onKeyDownDo
            onFocusDo={this.props.onFocusDo}
            cursorPosition={this.props.cursorPosition()}
            updateCursorPosition={this.props.updateCursorPosition}
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
          onHighlight={this.props.onHighlight} 
          onImportant={this.props.onImportant} 
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

const mapStateToProps = (state, ownProps) => {
  const noteLine = getNoteLine(state, ownProps.ID);
  if (noteLine) {
    return {
      noteLine,
      text: noteLine.text,
      important: noteLine.important,
      highlight: noteLine.highlight
    };
  }

  return {
    noteLine,
    text: '',
    important: {},
    highlight: {}
  }

}

export default connect(mapStateToProps)(NoteLine);