import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { keys } from 'lodash';

import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {
lightGreen300,
amber300,
teal200,
grey400
} from 'material-ui/styles/colors';

import BaseList from './BaseList';

import { dateToString, clinic, rightIconInfo } from './Helpers';
import { getAllPatients } from './reducers/index';


class PatientList extends React.Component {
  shouldComponentUpdate(nextProps) {
    return keys(this.props.patients).length !== keys(nextProps.patients).length;
  }

  renderPatientsFromStation(patients) {
    return patients.map(patient => {
      const clinicInfo = clinic(patient.clinic)

      return (
          <Link 
              key={patient.ID}
              to={"/patient/" + patient.ID}
              style={{textDecoration: 'none'}}
              >

            <ListItem
              primaryText={patient.firstName + ' ' + patient.lastName}
              secondaryText={
                <p>
                  <i className="mdi mdi-cake"></i> 
                  <span style={{paddingLeft: '5px'}}>{dateToString(patient.birthday)}</span>
                </p>  
              }
              leftAvatar={
                <Avatar
                  backgroundColor={clinicInfo.color}>
                  {patient.bedNumber}
                </Avatar>
              }
              rightIcon={rightIconInfo(clinicInfo)}
            />
          </Link>
        );
    });
  }

  renderTabs() {
    return this.props.patientsByStation.map(patientsInStation => {
      return (
          <Tab 
            key={patientsInStation.station}
            label={"Station: " + patientsInStation.station}>
            <div style={{overflowY: 'hidden'}}>
              <div style={{height: '535px', overflowY: 'auto', marginBottom: '0'}}>
    
                <Subheader inset={true}>Patients</Subheader>
                {this.renderPatientsFromStation(patientsInStation.patients)}
                </div> 
            </div> 
         </Tab> 
      );
    });
  }

  render() {
    return (
  		<BaseList>
        <Tabs style={{marginTop: '0'}} tabItemContainerStyle={{borderRight: '1px #aeaeae solid'}}>
          
          {this.renderTabs()}
        </Tabs>
	    </BaseList>
  	);
  }
}

const mapStateToProps = (state) => {
  const patients = getAllPatients(state)

  const stations = patients.reduce((prev, current) => {
    if (!prev.includes(current.station)) {
      prev = [...prev, current.station]
    }

    return prev;
  }, [])

  const patientsByStation = stations.map(station => ({station: station, patients: patients.filter(patient => station === patient.station)}))

  return {
    patientsByStation,
    patients
  };
}

export default connect(mapStateToProps)(PatientList);
