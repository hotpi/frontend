import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import { getPatientById } from './reducers/index';

import { dateToString, headerStylesMobile, labelStyles } from './Helpers';

const InfoLabels = (props) => {
  return (
    <div style={labelStyles.infoItem}>
      <h6 style={labelStyles.label}> {props.label} </h6>
      <p style={labelStyles.info}> {props.info}</p>
    </div>  
  )
};

class PatientHeader extends React.Component {
  shouldComponentUpdate(nextProps) {
    console.log('should patient header update: ', this.props.patient !== nextProps.patient)
    return this.props.patient !== nextProps.patient;
  }

  componentDidUpdate(nextProps) {
    console.log('PATIENT HEADER UPDATED: ', nextProps);
  }

  render() {

    return (        
        <Paper
          zDepth={0} 
          style={headerStylesMobile.area}>
          <h3 style={headerStylesMobile.header3}>Patient </h3>
          <h2 style={headerStylesMobile.header2}>{this.props.patient.firstName + ' ' + this.props.patient.lastName}  </h2>
          <hr style={headerStylesMobile.line}/>
          <InfoLabels 
            label="Clinic"
            info={this.props.patient.clinic} />
          <span style={headerStylesMobile.space1}></span>
          <InfoLabels 
            label="Admission date"
            info={dateToString(this.props.patient.admissionDate)} />
          <span style={headerStylesMobile.space2}></span>
          <InfoLabels 
            label="Discharge date"
            info={dateToString(this.props.patient.dischargeDate)} />
        </Paper>
    	)
  }
}

const mapStateToProps = (state, ownProps) => {
  const patient = getPatientById(state, ownProps.patientId);

  return {
    patient
  }
}

export default connect(mapStateToProps)(PatientHeader);
