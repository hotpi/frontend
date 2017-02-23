import React from 'react';

import TextField from 'material-ui/TextField';

import muiThemeable from 'material-ui/styles/muiThemeable';

import EventListener from 'react-event-listener';

const rowsHeight = 24

class LineText extends React.Component {
  constructor() {
    super()
    this.state = {
      height: null,
    }

    this.rows = 1
  }

  componentWillMount() {
    this.setState({
      height: this.rows * rowsHeight
    })
  }

  componentDidMount() {
    const { canGetFocus } = this.props
    if (canGetFocus) {
      this._input.focus()
    }

   this.syncHeight()
  }

  componentDidUpdate(nextProps) {
    console.log('cursor pos before:', this._input.selectionStart)
    this._input.selectionStart = this._input.selectionEnd = this.props.cursorPosition
    console.log('cursor pos after:', this._input.selectionStart)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.syncHeight(nextProps.text, 'componentWillReceiveProps')
    }
  }

  handleKeyDown(e) {
    const { onKeyDownDo } = this.props
    let start = e.target.selectionStart
    this.props.updateCursorPosition(e.keyCode === 46 ? start : start+1)
    onKeyDownDo(e)
  }

  syncHeight(newValue, caller) {
    console.log('triggered', caller)
    if (newValue !== undefined) {
      this._shadow.value = newValue
    }
    console.log('scroll Height input', this._input.scrollHeight)
    let newHeight = this._shadow.scrollHeight

   /* if (10 >= this.rows) {
      newHeight = Math.min(10*rowsHeight, newHeight)
    }
    newHeight = Math.max(newHeight, rowsHeight)*/
    console.log('height', newHeight, 'old', this.state.height, 'at input: ', this._input.style.height)
    if (this.state.height !== newHeight) {
      this.setState({
        height: newHeight
      })

      this.props.onChangeOfHeightDo(newHeight)
    }
  }

  handleFocus(e) {
    const { onFocusDo } = this.props
    onFocusDo()
    this.props.updateCursorPosition(this._input.selectionStart)
  }

  handleResize(e) {
    this.syncHeight(undefined, 'resize')
  }

  handleChange(e) {
    this.syncHeight(e.target.value, 'onChange')
    this.props.onChangeDo(e)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.cursorPosition !== nextProps.cursorPosition || this.props.text !== nextProps.text || this.props.highlight !== nextProps.highlight || this.state.height !== nextState.height;
  }
  /*<div style={
        {
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
          lineHeight: 24,
          display: 'inline-block',
          height: '100%'}
        }
          >
        <EventListener target="window" onResize={this.handleResize.bind(this)} />
        <textarea
            ref={(c) => this._shadow = c}
            tabIndex="-1"
            readOnly={true}
            value={text}
            rows="1"
            style={{width: '94%', height: 'initial', visibility: 'hidden', overflow: 'hidden', resize: 'none'}}/>

        <textarea 
          ref={(c) => this._input = c}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          placeholder={'Write here to start a new line'}
          rows={this.rows}
          style={{resize: 'none', height: this.state.height, overflow: 'hidden', fontFamily: this.props.muiTheme.fontFamily, fontSize: 16, outline: 'none', border: 'none', marginRight: 0, marginTop: 13, marginBottom: 11, paddingTop: 0, width: '94%', paddingBottom: 0, backgroundColor: highlight.set ? highlight.color : 'transparent'}}
          value={text} />
      </div>

      <TextField 
        underlineShow={false}
        multiLine={true}
        rows={1}
        value={text}
        onChange={onChangeDo}
        fullWidth={true}/>*/
  render() {
    const { text, highlight, onChangeDo, onKeyDownDo } = this.props

    return (
      <div style={
        {
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
          display: 'inline-block'}
        }
          >
        <EventListener target="window" onResize={this.handleResize.bind(this)} />
        <textarea
            ref={(c) => this._shadow = c}
            tabIndex="-1"
            readOnly={true}
            value={text}
            rows="1"
            style={{fontSize: '16px', width: '94%', position: 'absolute', height: 'initial', visibility: 'hidden', overflow: 'hidden', lineHeight: '24px', resize: 'none'}}/>

        <textarea 
          ref={(c) => this._input = c}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          placeholder={'Write here to start a new line'}
          rows={this.rows}
          style={{resize: 'none', height: this.state.height, overflow: 'hidden', fontFamily: this.props.muiTheme.fontFamily, lineHeight: '24px', fontSize: 16, outline: 'none', border: 'none', marginRight: 0, marginBottom: 13, marginTop: 13, paddingTop: 0, width: '94%', paddingBottom: 0, backgroundColor: highlight.set ? highlight.color : 'transparent'}}
          value={text} />
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
  onChangeDo: React.PropTypes.func.isRequired,
  onKeyDownDo: React.PropTypes.func.isRequired
}

export default muiThemeable()(LineText);