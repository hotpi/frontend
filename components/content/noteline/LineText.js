/**
 * LineText component holds the textareas on which the information is written
 *
 * @copyright Juan Cabello
 * @license GPLv3
 * @todo Change React.Component and React.PropTypes to just Component and PropTypes
 */

import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import EventListener from 'react-event-listener';

/**
 * Equals the html's line height.
 */
const rowsHeight = 18;

class LineText extends React.Component {

  /**
   * Initializes the state of the component
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      height: null
    };

    this.rows = 1;
  }

  /**
   * Lifecycle hook method that sets state's property height
   * right when the component is being mounted.
   *
   * @return {null} No return value.
   * @see https://facebook.github.io/react/docs/react-component.html#componentwillmount
   */
  componentWillMount() {
    this.setState({
      height: this.rows * rowsHeight
    });
  }

  /**
   * Lifecycle hook method that focus the input if it's possible and synchronizes
   * the height of the textarea according to the text inside it right after the component has been
   * mounted.
   *
   * @return {null} No return value.
   * @see https://facebook.github.io/react/docs/react-component.html#componentdidmount
   */
  componentDidMount() {
    const { canGetFocus } = this.props;

    if (canGetFocus) {
      this.input.focus();
    }

    this.syncHeight(this.props.text);
  }

  /**
   * Lifecycle hook method that synchronizes the cursor position with input's selectionStart and
   * selectionEnd every time that the component updates.
   *
   * @return {null} No return value.
   * @see https://facebook.github.io/react/docs/react-component.html#componentdidmount
   */
  componentDidUpdate() {
    // console.log('cursor pos before:', this.input.selectionStart)
    this.input.selectionStart = this.input.selectionEnd = this.props.cursorPosition;
    // console.log('cursor pos after:', this.input.selectionStart)
  }

  /**
   * Lifecycle hook method that synchronizes the height with its needed height depending on
   * the text inside the textarea right before it updates.
   *
   * @param {object} nextProps - new properties received
   * @return {null} No return value.
   * @see https://facebook.github.io/react/docs/react-component.html#componentdidmount
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.syncHeight(nextProps.text, 'componentWillReceiveProps');
    }
  }

  /**
   * Handles the key down event which fires a callback passed as a property
   * and updates the cursor position according to the key pressed.
   *
   * @param {SyntheticEvent} e - React's SyntheticEvent
   * @return {null} No return value.
   * @see https://facebook.github.io/react/docs/react-component.html#componentdidmount
   */
  handleKeyDown(e) {
    const { onKeyDownDo } = this.props;
    let start = e.target.selectionStart;
    // if delete key is pressed it must move to the right as it is the cursor must remain
    // at the same position it was before
    this.props.updateCursorPosition(e.keyCode === 46 ? start : start + 1);
    onKeyDownDo(e);
  }

  /**
   * Synchronizes the height of the textarea depending on the space needed for the text.
   *
   * @param {string} newValue - the new text value in the textarea.
   * @return {null} No return value
   */
  syncHeight(newValue) {
    // the shadow is a normal textarea that is hidden and it holds the exact same text
    // as the visible textarea; this makes the textarea responsive.
    if (newValue !== null) {
      this.shadow.value = newValue;
    }

    // eslint-disable-next-line
    console.log('>>>> noteLines text: ', this.props.text, 'scroll Height input', this.input.scrollHeight, 'scroll Height shadow', this.shadow.scrollHeight)
    let newHeight = this.shadow.scrollHeight;

    if (this.state.height !== newHeight) {
      this.setState({
        height: newHeight
      });

      this.props.onChangeOfHeightDo(newHeight);
    }
  }

  /**
   * Fires the callback when it receives a focus and it updates the cursor position to
   * its actual one.
   *
   * @return {null} No return value
   */
  handleFocus() {
    const { onFocusDo } = this.props;
    onFocusDo();
    this.props.updateCursorPosition(this.input.selectionStart);
  }

  /**
   * Handles the resizing of the window.
   *
   * @return {null} Returns no value
   */
  handleResize() {
    this.syncHeight(null);
  }

  /**
   * Handles the changes of the text in the textarea
   *
   * @param {SynthethicEvent} e - React's SynthethicEvent object
   * @return {null} Returns no value
   */
  handleChange(e) {
    this.syncHeight(e.target.value, 'onChange');
    this.props.onChangeDo(e);
  }

  /**
   * Lifecycle hook method that determines whether the component should be updated.
   * It overrides the standard behaviour that updates the component on every change.
   *
   * @param   {object} nextProps - new properties received.
   * @param   {object} nextState - new state received.
   * @return  {boolean} true when it should be updated; false otherwise.
   * @see https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.cursorPosition !== nextProps.cursorPosition ||
      this.props.text !== nextProps.text ||
      this.props.highlight !== nextProps.highlight ||
      this.state.height !== nextState.height;
  }

  /**
   * Render method of the component
   *
   * @return {node} React Component
   */
  render() {
    const { text, highlight } = this.props;

    return (
      <div style={{
        position: 'relative',
        padding: 0,
        width: '100%',
        cursor: 'inherit',
        fontStyle: 'inherit',
        fontVariant: 'inherit',
        fontWeight: 'inherit',
        fontStretch: 'inherit',
        fontSize: 16,
        transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1)',
        height: this.state.height,
        lineHeight: '18px',
        display: 'inline-block'
      }}
      >
        <EventListener target="window" onResize={this.handleResize.bind(this)} />
        <textarea
            ref={(c) => {
              this.shadow = c;
              return null;
            }}
            tabIndex="-1"
            readOnly={true}
            value={text}
            rows="1"
            style={{
              fontSize: '16px',
              width: '94%',
              position: 'absolute',
              height: 'initial',
              visibility: 'hidden',
              overflow: 'hidden',
              lineHeight: '18px',
              resize: 'none'
            }}
        />

        <textarea
          ref={(c) => {
            this.input = c;
            return null;
          }}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          placeholder={'Write here to start a new line'}
          rows={this.rows}
          style={{
            resize: 'none',
            height: this.state.height,
            overflow: 'hidden',
            fontFamily: this.props.muiTheme.fontFamily,
            lineHeight: '18px',
            fontSize: 16,
            outline: 'none',
            border: 'none',
            marginTop: 6,
            paddingTop: 0,
            width: '94%',
            paddingBottom: 0,
            backgroundColor: highlight.set ? highlight.color : 'transparent'
          }}
          value={text}
        />
      </div>
    );
  }
}

LineText.propTypes = {
  text: React.PropTypes.string.isRequired,
  highlight: React.PropTypes.shape({
    set: React.PropTypes.bool.isRequired,
    color: React.PropTypes.any.isRequired,
    value: React.PropTypes.any
  }).isRequired,
  muiTheme: React.PropTypes.shape({
    fontFamily: React.PropTypes.string
  }),
  onChangeDo: React.PropTypes.func.isRequired,
  onKeyDownDo: React.PropTypes.func.isRequired,
  onFocusDo: React.PropTypes.func,
  canGetFocus: React.PropTypes.bool,
  cursorPosition: React.PropTypes.number,
  updateCursorPosition: React.PropTypes.func,
  onChangeOfHeightDo: React.PropTypes.func
};

export default muiThemeable()(LineText);
