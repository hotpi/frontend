/**
 * InfoLabels component which shows information in form of a info label.
 *
 * @copyright Juan Cabello
 * @license GPLv3
 */

import React from 'react';
import { labelStyles } from '../../helpers/Helpers';

const InfoLabels = (props) => {
  return (
    <div className={props.classForPosition} style={labelStyles.infoItem}>
      <h6 style={labelStyles.label}> {props.label} </h6>
      <p style={labelStyles.info}> {props.info}</p>
    </div>
  );
};

InfoLabels.propTypes = {
  classForPosition: React.PropTypes.string,
  label: React.PropTypes.string,
  info: React.PropTypes.string
};

export default InfoLabels;
