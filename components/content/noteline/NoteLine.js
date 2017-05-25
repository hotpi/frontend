/**
 * TODO: Change React.Component and React.PropTypes to just Component and PropTypes
 */

import React from 'react';
import { connect } from 'react-redux';

import NoteLineOptions from './NoteLineOptions';
import CancelButton from './CancelButton';
import AddIcon from './AddIcon';
import LineText from './LineText';

import { lineOutHover } from '../../helpers/Helpers';

import {
  getNoteLine,
  getFocusedNoteLine
} from '../../../reducers';

class NoteLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canGetFocus: false
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text ||
      this.props.highlight !== nextProps.highlight ||
      this.props.important !== nextProps.important ||
      this.props.isFocused !== nextProps.isFocused;
  }

  render() {
    const { isFocused, deleteLine, last, important, highlight, text, canGetFocus } = this.props;

    if (!this.props.noteLine) {
      return null;
    }

    return (
      <div
        className={'note-line-container'}
        style={last ? lineOutHover.last : lineOutHover.notLast}
      >
        <div className={'line-w-button'} tabIndex="0">
          <AddIcon
            last={last}
            />
          <LineText
            onChangeDo={this.props.onChangeDo}
            onKeyDownDo={this.props.keyDownHandler}
            onFocusDo={this.props.onFocusDo}
            cursorPosition={this.props.cursorPosition()}
            updateCursorPosition={this.props.updateCursorPosition}
            onChangeOfHeightDo={this.props.onChangeOfHeightDo}
            text={text}
            highlight={highlight}
            canGetFocus={canGetFocus}
          />
          <CancelButton
            last={last}
            onClickDo={deleteLine}
            />
        </div>
        { isFocused ?
          <NoteLineOptions
            last={last}
            important={important}
            highlight={highlight}
            onHighlight={this.props.onHighlight}
            onImportant={this.props.onImportant}
          /> :
          null
        }
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
  noteLine: React.PropTypes.object,
  onChangeDo: React.PropTypes.func,
  keyDownHandler: React.PropTypes.func,
  onFocusDo: React.PropTypes.func,
  cursorPosition: React.PropTypes.func,
  updateCursorPosition: React.PropTypes.func,
  onChangeOfHeightDo: React.PropTypes.func,
  onHighlight: React.PropTypes.func,
  onImportant: React.PropTypes.func,
  isFocused: React.PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  const noteLine = getNoteLine(state, ownProps.ID);
  return {
    noteLine,
    isFocused: getFocusedNoteLine(state) === ownProps.ID,
    text: noteLine.text || '',
    important: noteLine.important || {},
    highlight: noteLine.highlight || {}
  };
};

export default connect(mapStateToProps)(NoteLine);
