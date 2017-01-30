import React from 'react';

import TextField from 'material-ui/TextField';

class LineText extends React.Component {
  componentDidMount() {
    const { canGetFocus } = this.props
    if (canGetFocus) {
      this._input.focus()
    }

    this.state = {
      cursorPosition: this._input.selectionStart
    }
  }

  componentDidUpdate(nextProps) {
    console.log('cursor pos before:', this._input.selectionStart)
    this._input.selectionStart = this._input.selectionEnd = 3//this.state.cursorPosition
    console.log('cursor pos after:', this._input.selectionStart)
  }

  handleKeyDown(e) {
    const { onKeyDownDo } = this.props
    let start = e.target.selectionStart
    console.log('im here')
    this.setState({
      cursorPosition: start + 1
    })
    onKeyDownDo(e)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text || this.props.highlight !== nextProps.highlight;
  }
  
  render() {
    const { text, highlight, onChangeDo, onKeyDownDo } = this.props

    return (
      <TextField 
        onChange={onChangeDo}
        onKeyDown={this.handleKeyDown.bind(this)}
        hintText={'Write here to start a new line'}
        rows={1}
        ref={(c) => this._input = c}
        multiLine={true}
        underlineShow={false} 
        textareaStyle={{paddingBottom: 0, backgroundColor: highlight.set ? highlight.color : 'transparent'}}
        inputStyle={{margin: 0, padding: 0}}
        style={{marginRight: 0, marginTop: 0, width: '94%'}} 
        value={text}
        >
      </TextField>
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