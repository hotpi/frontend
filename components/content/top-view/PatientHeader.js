import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import { blue800 } from 'material-ui/styles/colors';

import { getPatientById, getFirstPatientId } from '../../../reducers';

import { dateToString, headerStylesMobile, labelStyles } from '../../helpers/Helpers';

const InfoLabels = (props) => {
  return (
    <div className={props.classForPosition} style={labelStyles.infoItem}>
      <h6 style={labelStyles.label}> {props.label} </h6>
      <p style={labelStyles.info}> {props.info}</p>
    </div>
  );
};

InfoLabels.propTypes = {
  classForPosition: React.PropTypes.string,
  label: React.PropTypes.string,
  info: React.PropTypes.string
};

class PatientHeader extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.patient !== nextProps.patient;
  }

  render() {
    return (
        <Paper
          zDepth={0}
          style={
            headerStylesMobile.area
          }
        >
          <div className="column row">
            <div className="small-4 show-for-small-only colums">
              <FlatButton
                  className="show-for-small-only"
                  backgroundColor={blue800}
                  onTouchTap={this.props.onClickDo}
                  icon={<NavigationMenu color={'white'} />}
                  />
            </div>
            <h3 className="small-8 medium-12 columns" style={
              headerStylesMobile.header3
            }
            >Patient</h3>
            <h2
              className="small-8 medium-12 columns"
              style={
                headerStylesMobile.header2
              }
            >{this.props.patient.firstName + ' ' + this.props.patient.lastName}</h2>
            <hr
              className="small-8 medium-12 columns"
              style={
                headerStylesMobile.line
              }
            />
          </div>
          <div
            className="row"
            style={{
              margin: '0 0 0 30px'
            }}
          >
            <InfoLabels
              label="Clinic"
              info={this.props.patient.clinic}
              classForPosition="small-1 columns"
            />
            <InfoLabels
              label="Admission date"
              info={dateToString(this.props.patient.admissionDate)}
              // eslint-disable-next-line
              classForPosition="small-2 large-1 large-offset-4 small-offset-3 small-centered columns"
              />
            <InfoLabels
              label="Discharge date"
              info={dateToString(this.props.patient.dischargeDate)}
              classForPosition="small-2 large-1 large-offset-5 small-offset-3 columns"
              />
          </div>
        </Paper>
    );
  }
}

PatientHeader.propTypes = {
  patient: React.PropTypes.shape({
    clinic: React.PropTypes.string,
    admissionDate: React.PropTypes.string,
    dischargeDate: React.PropTypes.string,
    firstName: React.PropTypes.string,
    lastName: React.PropTypes.string
  }),
  onClickDo: React.PropTypes.func
};

const mapStateToProps = (state, { params }) => {
  const patientId = (params && params.patientId) || getFirstPatientId(state);
  const patient = patientId && getPatientById(state, patientId);

  return {
    patient
  };
};

export default withRouter(connect(mapStateToProps)(PatientHeader));
