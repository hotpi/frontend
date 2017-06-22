/**
 * NoteLine component that holds {@link LineText}, {@link NoteLineOptions}, {@link AddIcon}
 * and {@link CancelButton}.
 * @copyright Juan Cabello
 * @license GPLv3
 * @todo Change React.Component and React.PropTypes to just Component and PropTypes
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

  /**
   * Initializes the state of the component
   * @constructor
   * @param {object} props - the properties of the component
   */
  constructor(props) {
    super(props);

    this.state = {
      canGetFocus: false
    };
  }

  /**
   * Lifecycle hook method that determines whether the component should be updated.
   * It overrides the standard behaviour that updates the component on every change.
   *
   * @param   {object} nextProps - new properties received.
   * @return  {boolean} true when it should be updated; false otherwise.
   * @see https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate
   */
  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text ||
      this.props.highlight !== nextProps.highlight ||
      this.props.important !== nextProps.important ||
      this.props.isFocused !== nextProps.isFocused;
  }

  getTextComponent() {
    if (this.props.reviewMode) {
      return (
        <div>
          {this.props.text}
        </div>
      );
    }

    return (
      <div className={'line-w-button'} tabIndex="0">
        <AddIcon
          last={this.props.last}
        />
        <LineText
          onChangeDo={this.props.onChangeDo}
          onKeyDownDo={this.props.keyDownHandler}
          onFocusDo={this.props.onFocusDo}
          cursorPosition={this.props.cursorPosition()}
          updateCursorPosition={this.props.updateCursorPosition}
          onChangeOfHeightDo={this.props.onChangeOfHeightDo}
          text={this.props.text}
          highlight={this.props.highlight}
          canGetFocus={this.props.canGetFocus}
        />
        <CancelButton
          last={this.props.last}
          onClickDo={this.props.deleteLine}
        />
      </div>
    );
  }

  /**
   * Render method of the component
   *
   * @return {node} React Component
   */
  render() {
    const { isFocused, last, important, highlight, reviewMode } = this.props;

    if (!this.props.noteLine) {
      return null;
    }

    return (
      <div
        className={'note-line-container'}
        style={last ? lineOutHover.last : lineOutHover.notLaststyle}
      >
        {this.getTextComponent()}
        { isFocused || reviewMode ?
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

NoteLine.defaultProps = {
  reviewMode: false
};

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
  deleteLine: React.PropTypes.func,
  noteLine: React.PropTypes.object,
  onChangeDo: React.PropTypes.func,
  keyDownHandler: React.PropTypes.func,
  onFocusDo: React.PropTypes.func,
  cursorPosition: React.PropTypes.func,
  updateCursorPosition: React.PropTypes.func,
  onChangeOfHeightDo: React.PropTypes.func,
  onHighlight: React.PropTypes.func,
  onImportant: React.PropTypes.func,
  isFocused: React.PropTypes.bool,
  reviewMode: React.PropTypes
};

const mapStateToProps = (state, ownProps) => {
  const noteLine = getNoteLine(state, ownProps.ID);
  return {
    noteLine,
    isFocused: getFocusedNoteLine(state) === ownProps.ID,
    text: noteLine && noteLine.text || '',
    important: noteLine && noteLine.important || {},
    highlight: noteLine && noteLine.highlight || {}
  };
};

export default connect(mapStateToProps)(NoteLine);
