import React from 'react';

import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';

import Formsy from 'formsy-react';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';

import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { grey400, blue700 } from 'material-ui/styles/colors';

import { listStyle } from '../helpers/Helpers';

class BaseList extends React.Component {
  constructor() {
    super()
    this.state = {
      canSubmit: false,
      isOpen: false
    }
    this.errorMessages = {
      wordsError: "Please only use letters",
      numericError: "Please provide a number",
      urlError: "Please provide a valid URL",
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.notifyFormError = this.notifyFormError.bind(this)
  }


  handleOpen() {
    this.setState({
      isOpen: true
    })
  }

  handleClose() {
    this.setState({
      isClose: false
    })
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    })
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    })
  }

  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }


  render() {
    return (
        <List style={listStyle}>
          <Paper
            zDepth={0}
            style={{height: '88px', width: '100%', margin: '0', paddingTop: '24px'}}>
              <h3 style={{textAlign: 'center', paddingBottom: '0px', margin: '0'}}>Something</h3>
              <IconButton
                tooltip="add patient"
                tooltipPosition="top-right"
                onTouchTap={this.handleOpen.bind(this)}>
                <ContentAdd color={grey400} />
              </IconButton>
              <Dialog 
                title="New Patient"
                modal={true}
                open={this.state.isOpen}
                onRequestClose={this.handleClose.bind(this)}
                >
                <Formsy.Form
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    onValidSubmit={this.submitForm}
                    onInvalidSubmit={this.notifyFormError}
                  >
                    <FormsyText
                      name="name"
                      validations="isWords"
                      validationError={this.errorMessages.wordsError}
                      required
                      hintText="What is your name?"
                      floatingLabelText="Name"
                    />
                    <FormsyText
                      name="name"
                      validations="isWords"
                      validationError={this.errorMessages.wordsError}
                      required
                      hintText="What is your name?"
                      floatingLabelText="Name"
                    />
                    <FormsyText
                      name="name"
                      validations="isWords"
                      validationError={this.errorMessages.wordsError}
                      required
                      hintText="What is your name?"
                      floatingLabelText="Name"
                    />
                    <FormsySelect
                      name="frequency"
                      required
                      floatingLabelText="How often do you?"
                      menuItems={this.selectFieldItems}
                    >
                      <MenuItem value={'never'} primaryText="Never" />
                      <MenuItem value={'nightly'} primaryText="Every Night" />
                      <MenuItem value={'weeknights'} primaryText="Weeknights" />
                    </FormsySelect>
                    <FormsySelect
                      name="frequency"
                      required
                      floatingLabelText="How often do you?"
                      menuItems={this.selectFieldItems}
                    >
                      <MenuItem value={'never'} primaryText="Never" />
                      <MenuItem value={'nightly'} primaryText="Every Night" />
                      <MenuItem value={'weeknights'} primaryText="Weeknights" />
                    </FormsySelect>
                    <FormsyDate
                      name="date"
                      required
                      floatingLabelText="Date"
                    />
                    <FormsyDate
                      name="date"
                      required
                      floatingLabelText="Date"
                    />
                    <FormsyDate
                      name="date"
                      required
                      floatingLabelText="Date"
                    />
                </Formsy.Form>
              </Dialog>
              <IconButton
                tooltip="more"
                tooltipPosition="top-right"
                style={{left: '68%'}}>
                <NavigationMoreVert color={grey400} />
              </IconButton>
          </Paper>  
          <Divider style={{height: '6px', border: 0, boxShadow: 'inset 0 12px 12px -12px rgba(0, 0, 0, 0.5)'}}/>
          {this.props.children} 
        </List>
      );
  }
}

export default BaseList;