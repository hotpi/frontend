import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import ActionDone from 'material-ui/svg-icons/action/done';

import { actionsArea, typeValues } from './Helpers'

const NoteFooter = ({
  noteLines,
  hasFocus,
  type,
  onChangeDo,
  onSaveDo
}) => {
  console.log("" + typeValues.indexOf(type))
  return (
    <div style={noteLines > 1 || hasFocus || type !== "New" ? actionsArea.visible : actionsArea.hidden}>
      <SelectField 
        value={"" + typeValues.indexOf(type)}
        onChange={onChangeDo} 
        errorText={typeValues.indexOf(type) === 0 && 'Please select one'}
        style={{width: 210, paddingTop: 3, marginRight: 100, display: type !== "New" ? 'none' : 'block' }}>
          <MenuItem value="0" primaryText="Select the note's type" />
          <MenuItem value="1" primaryText="Diagnosis" />
          <MenuItem value="2" primaryText="History entry" />
          <MenuItem value="3" primaryText="ToDo entry" />
      </SelectField>
      <RaisedButton
        style={{position: 'relative', marginTop: 15, marginBottom: 15, marginLeft: type !== "New" ? 300 : 0}}
        label="Save"
        primary={true}
        icon={<ActionDone />} />
    </div>
  );
}

export default NoteFooter;