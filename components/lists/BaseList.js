import React from 'react';

import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';

import AddPatientForm from '../content/top-view/AddPatientForm';

import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { grey400, blue700 } from 'material-ui/styles/colors';

import { listStyle } from '../helpers/Helpers';

class BaseList extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  handleOpen() {
    this.setState({
      isOpen: true
    })
  }

  handleClose() {
    this.setState({
      isOpen: false
    })
  }

  render() {
    return (
        <List style={listStyle}>
          <Paper
            zDepth={0}
            style={{height: '60px', width: '100%', margin: '0', paddingTop: '17px'}}>
              <IconButton
                tooltip="add patient"
                tooltipPosition="top-right"
                onTouchTap={this.handleOpen.bind(this)}>
                <ContentAdd color={grey400} />
              </IconButton>
              <Dialog 
                title="New Patient"
                titleStyle={{fontWeight: 100, padding: '16px 24px'}}
                open={this.state.isOpen}
                onRequestClose={this.handleClose.bind(this)}
                contentStyle={{width: 380}}
                autoScrollBodyContent={true}
                >
                <AddPatientForm 
                  closeDialog={() => this.handleClose()}
                  />
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