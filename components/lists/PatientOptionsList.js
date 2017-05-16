import React from 'react';
import { withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FontIcon from 'material-ui/FontIcon';

import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionHistory from 'material-ui/svg-icons/action/history';

import {
deepPurple600,
cyan500,
pink500
} from 'material-ui/styles/colors';

import BaseList from './BaseList';

import { getFirstPatientId } from '../../reducers';

const StethoscopeIcon = (props) => (
  <FontIcon {...props}
    className="mdi mdi-stethoscope" />
);


// TODO: Refactor to a cleaner order
const handleBrowserHistory = (patientId, type) => {
  if (type !== 'back') {
    browserHistory.push('/patient/' + patientId + '/' + type);
  } else {
    browserHistory.push('/patients');
  }
};

class PatientOptionsList extends React.Component {
  render() {
    const { patientId } = this.props;

    return (
        <BaseList
          width={this.props.width}
          onClickDo={this.props.onClickDo}
          isDrawerOpen={this.props.isDrawerOpen}
        >
          <div style={{
            overflowY: 'auto',
            border: 'none'
          }}
          >
            <ListItem
              onTouchTap={() => handleBrowserHistory(patientId, 'back')}
              primaryText="Back"
              leftIcon={<NavigationChevronLeft />}
            />
            <Divider />

            <Subheader inset={true}>Patient Information</Subheader>
            <ListItem
              onTouchTap={() => handleBrowserHistory(patientId, 'diagnosis')}
              primaryText="Diagnosis"
              leftIcon={
                <StethoscopeIcon
                  style={{
                    color: deepPurple600
                  }}
                />
              }
              style={{
                padding: '5px 0'
              }}
            />
          <ListItem
              onTouchTap={() => handleBrowserHistory(patientId, 'history/0')}
              primaryText="History"
              leftIcon={
                <ActionHistory
                  color={pink500} />
              }
              style={{
                padding: '5px 0'
              }}
            />
            <ListItem
              onTouchTap={() => handleBrowserHistory(patientId, 'todo')}
              primaryText="ToDo"
              leftIcon={
                <ActionAssignment
                  color={cyan500} />
              }
              style={{
                padding: '5px 0'
              }}
            />

          </div>
        </BaseList>
    );
  }
}

PatientOptionsList.propTypes = {
  patientId: React.PropTypes.string,
  width: React.PropTypes.number,
  onClickDo: React.PropTypes.func,
  isDrawerOpen: React.PropTypes.bool
};

const mapStateToProps = (state, { params }) => {
  const patientId = params.patientId || getFirstPatientId(state);

  return {
    patientId
  };
};

export default withRouter(connect(mapStateToProps)(PatientOptionsList));
