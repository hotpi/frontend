import React from 'react';


import {
green400,
cyan500,
blue800
} from 'material-ui/styles/colors';

import PatientOptionsList from './PatientOptionsList';
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

export default class PatientDetailContainer extends React.Component {
  constructor() {
    super();
  }

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
