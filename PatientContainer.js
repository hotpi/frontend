import React from 'react';

import PatientList from './PatientList';
import PatientHeader from './PatientHeader';
import Note from './Note';

import { patientIds } from './configureStore';

export default class PatientContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidUpdate(nextProps) {
    console.log('PATIENTCONTAINER UPDATED: ', nextProps);
  }

  render() {

    return (
        <div style={{display: 'inline-flex'}}>
          <PatientList />
          <div style={{display: 'block', overflow: 'hidden'}}>
        		<PatientHeader patientId={patientIds[0]}/>
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
