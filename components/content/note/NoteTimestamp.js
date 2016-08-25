import React from 'react';

import Paper from 'material-ui/Paper';

import DeviceAccessTime from 'material-ui/svg-icons/device/access-time';

import { dateToString } from '../../helpers/Helpers'

const getFormattedDate = (date) => {

  const yearNow = new Date().getFullYear()
  const yearTimestamp = date.getFullYear()
  const dayNow = new Date().getDate()
  const dayTimestamp = date.getDate()
  const monthNow = new Date().getMonth()
  const monthTimestamp = date.getMonth()

  if (dayNow === dayTimestamp && monthNow === monthTimestamp && yearNow === yearTimestamp) {
    return 'Today';
  } else if ((dayNow - 1) === dayTimestamp && monthNow === monthTimestamp && yearNow === yearTimestamp) {
    return 'Yesterday';
  } 
  
  return dateToString(date);
}

const NoteTimestamp = ({
  type,
  date
}) => {
  return (
    <Paper  
      zDepth={1}
      style={{width: 140, height: 40, marginLeft: 1, display: type === "history" || type === "todo" ? 'inline-flex': 'none'}}>
      <DeviceAccessTime style={{color: 'grey', height: 24, width: 24, marginLeft: 10, marginTop: 10}}/><h3 style={{padding: 12, margin: 0, textAlign: 'center', fontWeight: 100}}>{getFormattedDate(date)}</h3>
    </Paper>
  );
}

NoteTimestamp.propTypes = {
  type: React.PropTypes.string.isRequired,
  date: React.PropTypes.object
}

export default NoteTimestamp;