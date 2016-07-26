import React from 'react';

import Paper from 'material-ui/Paper';

import {
deepPurple600,
cyan500,
blue800
} from 'material-ui/styles/colors';

import PatientList from './PatientList';
import PatientHeader from './PatientHeader';

const headerStylesDesktop = {
  height: '154px',
  backgroundColor: blue800,
  width: '76vw',
  left: '19.2em'
};

const headerStylesMobile = {
  height: '154px',
  backgroundColor: blue800,
  width: '70vw',
  left: '19.2em'
};

export default class Root extends React.Component {
  render() {

    return (
        <div style={{display: 'inline-flex'}}>
          <PatientList />
      		<PatientHeader />
        </div>
    	)
  }
}
