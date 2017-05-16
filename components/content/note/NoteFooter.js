import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import ActionDone from 'material-ui/svg-icons/action/done';

import { actionsArea } from '../../helpers/Helpers';

// TODO: Why do are those things here??
/* "small-3 small-offset-3 small-centered large-2 large-centered large-offset-6 columns" */
/* "small-6 large-4 columns" */

const NoteFooter = ({
  show,
  type,
  value,
  onChangeDo,
  onSaveDo
}) => {
  return (
    <div className="row small-collapse medium-collapse large-collapse"
      style={show ? actionsArea.visible : actionsArea.hidden}
    >
      <SelectField
        className="small-5 medium-6large-5 small-centered columns"
        value={value}
        onChange={onChangeDo}
        errorText={+value === 0 && 'Please select one'}
        autoWidth={true}
        underlineStyle={{
          width: '90%'
        }}
        selectedMenuItemStyle={{
          width: '90%'
        }}
        style={{
          paddingTop: 3,
          paddingLeft: 20,
          display: type !== 'new' ? 'none' : 'block'
        }}>
          <MenuItem value="0" primaryText="Select the note's type" />
          <MenuItem value="1" primaryText="Diagnosis" />
          <MenuItem value="2" primaryText="History" />
          <MenuItem value="3" primaryText="ToDo" />
      </SelectField>
      <div
        // eslint-disable-next-line
        className="small-1 medium-3 large-3 small-centered small-offset-1 medium-offset-2 large-offset-3  columns" 
      >
        <FlatButton
          backgroundColor="#00bcd4"
          style={{
            margin: '15px 0',
            padding: 0,
            position: 'relative'
          }}
          onTouchTap={onSaveDo}
          label="Save"
          labelPosition="after"
          labelStyle={{
            color: 'white',
            position: 'auto'
          }}
          primary={true}
          icon={<ActionDone color="white"/>}
        />
      </div>
    </div>
  );
};

NoteFooter.propTypes = {
  show: React.PropTypes.bool.isRequired,
  type: React.PropTypes.string.isRequired,
  onChangeDo: React.PropTypes.func.isRequired,
  value: React.PropTypes.number,
  onSaveDo: React.PropTypes.func
};

export default NoteFooter;
