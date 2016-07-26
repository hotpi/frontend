import React from 'react';

import Paper from 'material-ui/Paper';

import {
deepPurple600,
cyan500,
blue800
} from 'material-ui/styles/colors';

import PatientList from './PatientList';

const headerStylesDesktop = {
  height: '154px',
  backgroundColor: blue800,
  width: '76vw',
  left: '19.2em'
};

const headerStylesMobile = {
  area: {
    height: '154px',
    backgroundColor: blue800,
    width: '70vw',
    left: '19.2em'
  },
  header3: {
    color: 'white', 
    marginBottom: '5px', 
    padding: '0 10px 0 30px', 
    fontWeight: '200'
  },
  header2: {
    color: 'white', 
    marginTop: '10px', 
    marginBottom: '10px', 
    padding: '0 5px 0 30px', 
    fontWeight: '400'
  },
  line: {
    marginBottom: '0', 
    color: 'white', 
    border: '0', 
    height: '1px', 
    backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0))'
  },
  space1: {
    padding: '0 9vw'
  },
  space2: {
    padding: '0 7vw'
  }
};

const labelStyles = {
  infoItem: {
    padding: '1em 2em 1em 2em',
    display: 'inline-block',
    backgroundColor: 'transparent'
  },

  info: {
    color: 'white',
    margin: '3px 0 0 0',
    fontWeight: '600'
  },

  label: {
    color: 'white',
    margin: '0',
    fontWeight: '200'
  }
};

const InfoLabels = (props) => {
  return (
    <div style={labelStyles.infoItem}>
      <h6 style={labelStyles.label}> {props.label} </h6>
      <p style={labelStyles.info}> {props.info}</p>
    </div>  
  )
};

export default class Root extends React.Component {
  render() {
    return (        
        <Paper
          zDepth={0} 
          style={headerStylesMobile.area}>
          <h3 style={headerStylesMobile.header3}>Patient </h3>
          <h2 style={headerStylesMobile.header2}>Max Mustermann </h2>
          <hr style={headerStylesMobile.line}/>
          <InfoLabels 
            label="Clinic"
            info="Endo" />
          <span style={headerStylesMobile.space1}></span>
          <InfoLabels 
            label="Admission date"
            info="12/6/2016" />
          <span style={headerStylesMobile.space2}></span>
          <InfoLabels 
            label="Discharge date"
            info="21/6/2016" />
        </Paper>
    	)
  }
}
