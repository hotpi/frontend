import React from 'react';

import TextField from 'material-ui/TextField';

const LineText = ({
  text,
  highlight,
  canGetFocus,
  onChangeDo,
  onKeyDownDo
}) => {
  return (
    <TextField 
      onChange={onChangeDo}
      onKeyDown={onKeyDownDo}
      hintText={'Write here to start a new line'}
      rows={1}
      ref={(c) => {
                if (canGetFocus && c !== null) {
                  c.focus()
                }
              }
            }
      multiLine={true}
      underlineShow={false} 
      textareaStyle={{paddingBottom: 0, backgroundColor: highlight.set ? highlight.color : 'transparent'}}
      inputStyle={{margin: 0, padding: 0}}
      style={{marginRight: 0, marginTop: 0, width: '94%'}} 
      defaultValue={text}
      >
    </TextField>
  );
}

export default LineText;