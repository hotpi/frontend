import React from 'react';

import TextField from 'material-ui/TextField';

class LineText extends React.Component {
  componentDidMount() {
    const { canGetFocus } = this.props
    if (canGetFocus) {
      this._input.focus()
    }
    /*
    setInterval(() => 
      console.log('cursor at:', this._input.selectionStart), 1000)
    */
  }

  componentDidUpdate(nextProps) {
    console.log('cursor pos before:', this._input.selectionStart)
    this._input.selectionStart = this._input.selectionEnd = this.props.cursorPosition
    console.log('cursor pos after:', this._input.selectionStart)
  }

  handleKeyDown(e) {
    const { onKeyDownDo } = this.props
    let start = e.target.selectionStart
    console.log('im here')
    this.props.updateCursorPosition(start+1)
    /*this.setState({
      cursorPosition: start + 1
    })*/
    onKeyDownDo(e)
  }

  handleFocus(e) {
    const { onFocusDo } = this.props
    onFocusDo()
    this.props.updateCursorPosition(this._input.selectionStart)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text || this.props.highlight !== nextProps.highlight;
  }
  
  render() {
    const { text, highlight, onChangeDo, onKeyDownDo } = this.props

    return (
      <textarea 
        ref={(c) => this._input = c}
        onChange={onChangeDo}
        onFocus={this.handleFocus.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
        placeholder={'Write here to start a new line'}
        rows={0}
        style={{fontSize: 16, outline: 'none', border: 'none', resize: 'none', marginRight: 0, marginTop: 13, marginBottom: 0, paddingTop: 0, width: '94%', paddingBottom: 0, backgroundColor: highlight.set ? highlight.color : 'transparent'}}
        value={text}
        >
       
      </textarea>
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

export default LineText;