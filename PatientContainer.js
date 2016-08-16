import React from 'react';

import PatientList from './PatientList';
import PatientHeader from './PatientHeader';
import Note from './Note';

import { patientIds } from './configureStore';

class PatientContainer extends React.Component {
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

export default PatientContainer;
