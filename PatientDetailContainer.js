import React from 'react';

import {
green400,
cyan500,
blue800
} from 'material-ui/styles/colors';

import PatientOptionsList from './PatientOptionsList';
import PatientHeader from './PatientHeader';
import Note from './Note';

class PatientDetailContainer extends React.Component {
  render() {
    
    return (
        <div style={{display: 'inline-flex'}}>
          <PatientOptionsList />
          <div style={{display: 'block', overflow: 'hidden'}}>
        		<PatientHeader />
            <Note type={this.props.params.type}
                  title={this.props.params.type}/>
          </div>
        </div>
    	);
  }
}

export default PatientDetailContainer;
