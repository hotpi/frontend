/**
 * AddPatientForm component which displays a modal for adding a new patient.
 *
 * @copyright Juan Cabello
 * @license GPLv3
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Form } from 'formsy-react';
import {
  FormsyDate,
  FormsySelect,
  FormsyText
} from 'formsy-material-ui/lib';

import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import { addPatient } from '../../../actions/patients';

class AddPatientForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      isOpen: false
    };

    this.errorMessages = {
      wordsError: 'Please only use letters',
      numericError: 'Please provide a number',
      urlError: 'Please provide a valid URL'
    };

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  submitForm(data) {
    // eslint-disable-next-line no-alert
    this.props.addPatient(data);
    this.props.closeDialog();
  }

  notifyFormError(data) {
    throw new Error('Form error: ', data);
  }

  render() {
    return (
      <Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
         >
          <FormsyText
            name="firstName"
            validations="isWords"
            validationError={this.errorMessages.wordsError}
            style={{
              width: '48%',
              marginRight: 4,
              marginTop: 0
            }}
            errorStyle={{
              float: 'left'
            }}
            required
            floatingLabelText="First name"
          />
          <FormsyText
            name="lastName"
            validations="isWords"
            validationError={this.errorMessages.wordsError}
            style={{
              width: '48%',
              marginRight: 4,
              marginTop: 0
            }}
            errorStyle={{
              float: 'left'
            }}
            required
            floatingLabelText="Last name"
          />
          <FormsyText
            name="bedNumber"
            validations="isNumeric"
            validationError={this.errorMessages.numericError}
            style={{
              width: '100%',
              marginRight: 4,
              marginTop: 0,
              padding: 0
            }}
            errorStyle={{
              float: 'left'
            }}
            required
            floatingLabelText="Bed number"
          />
          <FormsyDate
            name="birthday"
            maxDate={new Date()}
            formatDate={new Intl.DateTimeFormat('de-GE', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            }).format}
            required
            style={{
              display: 'inline-block',
              width: '100%',
              margin: 0,
              padding: 0
            }}
            textFieldStyle={{
              width: '100%',
              padding: 0,
              margin: 0
            }}
            floatingLabelText="Birthdate"
            autoOk={true}
          />

          <FormsySelect
            name="clinic"
            floatingLabelText="Clinic"
            style={{
              width: '100%',
              marginRight: 4,
              marginTop: 0
            }}
            required
          >
            <MenuItem value={'endo'} primaryText="Endocrinology" />
            <MenuItem value={'pneu'} primaryText="Pulmonology" />
            <MenuItem value={'all'} primaryText="General pediatry" />
          </FormsySelect>
          <FormsySelect
            name="station"
            floatingLabelText="Station"
            style={{
              width: '100%',
              marginRight: 4,
              marginTop: 0
            }}
            required
          >
            <MenuItem value={'28'} primaryText="28" />
            <MenuItem value={'29'} primaryText="29" />
          </FormsySelect>
          <FormsyDate
            name="admissionDate"
            required
            floatingLabelText="Admission date"
            formatDate={new Intl.DateTimeFormat('de-GE', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            }).format}
            minDate={new Date()}
            style={{
              display: 'inline-block',
              width: '100%',
              margin: 0,
              padding: 0
            }}
            textFieldStyle={{
              width: '100%',
              padding: 0,
              margin: 0
            }}
            autoOk={true}
          />
          <FormsyDate
            name="dischargeDate"
            required
            floatingLabelText="Discharge date"
            minDate={new Date()}
            formatDate={new Intl.DateTimeFormat('de-GE', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            }).format}
            style={{
              display: 'inline-block',
              width: '100%',
              margin: 0,
              padding: 0
            }}
            textFieldStyle={{
              width: '100%',
              padding: 0,
              margin: 0
            }}
            autoOk={true}
          />
          <RaisedButton
              style={{
                float: 'right',
                marginTop: 10
              }}
              type="submit"
              primary={true}
              label="Submit"
              disabled={!this.state.canSubmit}
            />
      </Form>
    );
  }
}

AddPatientForm.propTypes = {
  addPatient: React.PropTypes.func,
  closeDialog: React.PropTypes.func
};


const mapDispatchToProps = (dispatch) => {
  return {
    addPatient: (info) => dispatch(addPatient(info))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(AddPatientForm));
