import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import EventListener from 'react-event-listener';

const rowsHeight = 24;

class LineText extends React.Component {
  constructor() {
    super();

    this.state = {
      height: null
    };

    this.rows = 1;
  }

  componentWillMount() {
    this.setState({
      height: this.rows * rowsHeight
    });
  }

  componentDidMount() {
    const { canGetFocus } = this.props;

    if (canGetFocus) {
      this.input.focus();
    }

    this.syncHeight();
  }

  componentDidUpdate() {
    // console.log('cursor pos before:', this.input.selectionStart)
    this.input.selectionStart = this.input.selectionEnd = this.props.cursorPosition;
    // console.log('cursor pos after:', this.input.selectionStart)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.syncHeight(nextProps.text, 'componentWillReceiveProps');
    }
  }

  handleKeyDown(e) {
    const { onKeyDownDo } = this.props;
    let start = e.target.selectionStart;
    this.props.updateCursorPosition(e.keyCode === 46 ? start : start + 1);
    onKeyDownDo(e);
  }

  syncHeight(newValue) {
    // console.log('triggered', caller)
    if (newValue !== null) {
      this.shadow.value = newValue;
    }
    // console.log('scroll Height input', this.input.scrollHeight)
    let newHeight = this.shadow.scrollHeight;

    if (this.state.height !== newHeight) {
      this.setState({
        height: newHeight
      });

      this.props.onChangeOfHeightDo(newHeight);
    }
  }

  handleFocus() {
    const { onFocusDo } = this.props;
    onFocusDo();
    this.props.updateCursorPosition(this.input.selectionStart);
  }

  handleResize() {
    this.syncHeight(null);
  }

  handleChange(e) {
    this.syncHeight(e.target.value, 'onChange');
    this.props.onChangeDo(e);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.cursorPosition !== nextProps.cursorPosition ||
      this.props.text !== nextProps.text ||
      this.props.highlight !== nextProps.highlight ||
      this.state.height !== nextState.height;
  }

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
        lineHeight: '24px',
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
              lineHeight: '24px',
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
            lineHeight: '24px',
            fontSize: 16,
            outline: 'none',
            border: 'none',
            marginRight: 0,
            marginBottom: 13,
            marginTop: 13,
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
