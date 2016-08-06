import React from 'react';

import TextField from 'material-ui/TextField';

class LineText extends React.Component {
  componentDidMount() {
    const { canGetFocus } = this.props
    if (canGetFocus) {
      this._input.focus()
    }

  }
  
  render() {
    const { text, highlight, onChangeDo, onKeyDownDo } = this.props;

    return (
      <TextField 
        onChange={onChangeDo}
        onKeyDown={onKeyDownDo}
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
    color: React.PropTypes.string.isRequired,
    value: React.PropTypes.string
  }).isRequired,
  onChangeDo: React.PropTypes.func.isRequired,
  onKeyDownDo: React.PropTypes.func.isRequired
}

export default LineText;