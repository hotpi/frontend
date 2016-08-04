import React from 'react';


import {
green400,
cyan500,
blue800
} from 'material-ui/styles/colors';

import PatientList from './PatientList';
import PatientHeader from './PatientHeader';
import Note from './Note';

import { headerStylesDesktop, headerStylesMobile } from './Helpers'

export default class PatientContainer extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
        <div style={{display: 'inline-flex'}}>
          <PatientList />
          <div style={{display: 'block', overflow: 'hidden'}}>
        		<PatientHeader />
            <Note />
          </div>
        </div>
    	);
  }
}

PatientContainer.defaultProps = {
  params: {
    id: 1
  }
}
