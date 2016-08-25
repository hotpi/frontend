import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import ActionDone from 'material-ui/svg-icons/action/done';

import { actionsArea, typeValues } from '../../helpers/Helpers';

const NoteFooter = ({
  show,
  type,
  value,
  onChangeDo,
  onSaveDo
}) => {
  return (
    <div style={show ? actionsArea.visible : actionsArea.hidden}>
      <SelectField 
        value={value}
        onChange={onChangeDo} 
        errorText={+value === 0 && 'Please select one'}
        style={{width: 210, paddingTop: 3, marginRight: 100, display: type !== 'new' ? 'none' : 'block' }}>
          <MenuItem value='0' primaryText="Select the note's type" />
          <MenuItem value='1' primaryText='Diagnosis' />
          <MenuItem value='2' primaryText='History' />
          <MenuItem value='3' primaryText='ToDo' />
      </SelectField>
      <RaisedButton
        style={{position: 'relative', marginTop: 15, marginBottom: 15, marginLeft: type !== 'new' ? 300 : 0}}
        onClick={onSaveDo}
        label='Save'
        primary={true}
        icon={<ActionDone />} />
    </div>
  );
}

NoteFooter.propTypes = {
  show: React.PropTypes.bool.isRequired,
  type: React.PropTypes.string.isRequired,
  onChangeDo: React.PropTypes.func.isRequired,
  onSaveDo: React.PropTypes.func //.isRequired
}

export default NoteFooter;