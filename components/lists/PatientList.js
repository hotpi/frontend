/**
 * PatientList component shows the list of the patients.
 *
 * @copyright Juan Cabello
 * @license GPLv3
 */


import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';

import { Tabs, Tab } from 'material-ui/Tabs';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

import BaseList from './BaseList';

import { dateToString, clinic, rightIconInfo } from '../helpers/Helpers';
import { getAllPatients } from '../../reducers';

import { deletePatient } from '../../actions/patients';

class PatientList extends React.Component {
  constructor() {
    super();
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.flag = 0;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.patients.length !== nextProps.patients.length ||
    this.props.isDrawerOpen !== nextProps.isDrawerOpen ||
    this.props.width !== nextProps.width;
  }

  handleMouseDown() {
    this.flag = 0;
  }

  handleMouseMove() {
    this.flag = 1;
  }

  handleClick(e) {
    if (this.flag === 1) {
      e.preventDefault();
    }
  }


  renderPatientsFromStation(patients) {
    return patients.map(patient => {
      const clinicInfo = clinic(patient.clinic);

      return (
        <Swipeout
          key={patient.ID}
          autoClose
          right={[
            {
              text: 'Delete',
              onPress: () => this.props.deletePatient(patient.ID),
              style: {
                cursor: 'pointer',
                backgroundColor: 'red',
                color: 'white',
                padding: '0 1.5em',
                right: 1,
                fontWeight: 400,
                fontSize: 16
              }
            }
          ]}
        >
          <Link
              to={'/patient/' + patient.ID}
              style={{
                textDecoration: 'none'
              }}
              onMouseDown={this.handleMouseDown}
              onMouseMove={this.handleMouseMove}
              onTouchTap={this.handleClick}
              >

            <ListItem
              primaryText={patient.firstName + ' ' + patient.lastName}
              secondaryText={
                <p>
                  <i className="mdi mdi-cake" />
                  <span style={{
                    paddingLeft: '5px'
                  }}>{dateToString(patient.birthday)}</span>
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
        </Swipeout>
      );
    });
  }

  renderTabs() {
    return this.props.patientsByStation.map(patientsInStation => {
      return (
          <Tab
            key={patientsInStation.station}
            label={'Station: ' + patientsInStation.station}>
            <div style={{
              overflowY: 'hidden'
            }}
            >
              <div style={{
                height: '535px',
                overflowY: 'auto',
                marginBottom: '0'
              }}
              >
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
      <BaseList
        width={this.props.width}
        onClickDo={this.props.onClickDo}
        isDrawerOpen={this.props.isDrawerOpen}
      >
        <Tabs
          style={{
            marginTop: '0'
          }}
          tabItemContainerStyle={{
            borderRight: '1px #aeaeae solid'
          }}
        >
          {this.renderTabs()}
        </Tabs>
      </BaseList>
    );
  }
}

PatientList.propTypes = {
  deletePatient: React.PropTypes.func,
  patients: React.PropTypes.array,
  patientsByStation: React.PropTypes.array,
  width: React.PropTypes.number,
  onClickDo: React.PropTypes.func,
  isDrawerOpen: React.PropTypes.bool
};


const mapStateToProps = (state) => {
  const patients = getAllPatients(state);

  let stations = patients.reduce((prev, current) => {
    if (!prev.includes(current.station)) {
      prev = [
        ...prev,
        current.station
      ];
    }

    return prev;
  }, []);

  let sortedStations = stations.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }

    return 0;
  });

  const patientsByStation = sortedStations.map(station =>
    ({ station: station, patients: patients.filter(patient => station === patient.station) })
  );

  return {
    patientsByStation,
    patients
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePatient: (patientID) => dispatch(deletePatient(patientID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
