import React from 'react';


import {
green400,
cyan500,
blue800
} from 'material-ui/styles/colors';

import PatientList from './PatientList';
import PatientHeader from './PatientHeader';
import Note from './Note';



const headerStylesDesktop = {
  height: '154px',
  backgroundColor: blue800,
  width: '76vw',
  left: '19.2em'
};


//const lineOnHover = Object.assign(onHover, lineOutHover);




const headerStylesMobile = {
  height: '154px',
  backgroundColor: blue800,
  width: '70vw',
  left: '19.2em'
};

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
            <Note 
              title="History" 
              type="History"/>
          </div>
        </div>
    	);
  }
}
