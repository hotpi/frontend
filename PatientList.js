import React from 'react';

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

const listStyle = {
    width: '19.2em', 
    minHeight: '100vh', 
    borderRight: '0.1em #d0d0d0 solid', 
    boxShadow: '3px 0 2px #aeaeae', 
    overflowY: 'hidden', 
    overflowX: 'hidden'
};

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left">
    <ContentAdd color={grey400} />
  </IconButton>
);

const clinic = (name) => {
  switch(name) {
  case 'ENDO':
    return {color: lightGreen300, name: 'Endo'}
  case 'ALL':
    return {color: teal200, name: 'All'}
  case 'PNEU':
    return {color: amber300, name: 'Pneu'}
  default: 
    return {color: grey400, name: ''}
  }
};

const rightIconInfo = (clinicInfo) => 
{
  return (
  <div style={{margin: '0 12px'}}>
    <ActionLabel color={clinicInfo.color} />
    <h6 style={{margin: '0', color: clinicInfo.color}}> {clinicInfo.name} </h6>
  </div>
  )
};

export default class Root extends React.Component {
  render() {

    return (
    		<List style={listStyle}>
          <Paper
            zDepth={0}
            style={{height: '60px', width: '100%'}}>
              <h3 style={{textAlign: 'center', paddingBottom: '0px', marginBottom: '0'}}>Something</h3>
              <IconButton
                tooltip="add patient"
                tooltipPosition="top-right">
                <ContentAdd color={grey400} />
              </IconButton>
              <IconButton
                tooltip="more"
                tooltipPosition="top-right"
                style={{left: '68%'}}>
                <NavigationMoreVert color={grey400} />
              </IconButton>
          </Paper>  
          <Divider style={{borderBottom: '1px darkgrey solid', boxShadow: '0 0.19em 0.3em #aeaeae', zIndex: '999'}}/>
          <Tabs style={{marginTop: '0.2em'}} tabItemContainerStyle={{borderRight: '10px #aeaeae solid'}}>
            <Tab label='Station 28'>
              <div style={{overflowY: 'auto', border: 'none'}}>

                <Subheader inset={true}>Patients</Subheader>
                <ListItem
                  primaryText="Patient 1"
                  leftAvatar={
                    <Avatar
                      backgroundColor={lightGreen300}>
                      P1
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('ENDO'))}
                />
                <ListItem
                  primaryText="Patient 2"
                  leftAvatar={
                    <Avatar
                      backgroundColor={teal200}>
                      P2
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('ALL'))}
                />
                <ListItem
                  primaryText="Patient 3"
                  leftAvatar={
                    <Avatar
                      backgroundColor={lightGreen300}>
                      P3
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('ENDO'))}
                />
                <ListItem
                  primaryText="Patient 4"
                  leftAvatar={
                    <Avatar
                      backgroundColor={amber300}>
                      P4
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('PNEU'))}
                />
                <ListItem
                  primaryText="Patient 5"
                  leftAvatar={
                    <Avatar
                      backgroundColor={teal200}>
                      P5
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('ALL'))}
                />
                <ListItem
                  primaryText="Patient 6"
                  leftAvatar={
                    <Avatar
                      backgroundColor={amber300}>
                      P6
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('PNEU'))}
                />
                <ListItem
                  primaryText="Patient 7"
                  leftAvatar={
                    <Avatar
                      backgroundColor={amber300}>
                      P7
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('PNEU'))}
                />
                <ListItem
                  primaryText="Patient 8"
                  leftAvatar={
                    <Avatar
                      backgroundColor={lightGreen300}>
                      P8
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('ENDO'))}
                />
                <ListItem
                  primaryText="Patient 9"
                  leftAvatar={
                    <Avatar
                      backgroundColor={lightGreen300}>
                      P9
                    </Avatar>}
                  rightIcon={rightIconInfo(clinic('ENDO'))}
                />
                <ListItem
                  primaryText="Patient 10"
                  leftAvatar={
                    <Avatar
                      backgroundColor={amber300}>
                      P10
                    </Avatar>}
                  rightIcon={rightIconInfo(clinic('PNEU'))}
                />
              </div> 
           </Tab> 
            <Tab label='Station 29'>
              <div style={{overflowY: 'auto'}}>

                <Subheader inset={true}>Patients</Subheader>
      		      <ListItem
                  primaryText="Patient 1"
                  leftAvatar={
                    <Avatar
                      backgroundColor={lightGreen300}>
                      P1
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('ENDO'))}
                />
                <ListItem
                  primaryText="Patient 2"
                  leftAvatar={
                    <Avatar
                      backgroundColor={teal200}>
                      P2
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('ALL'))}
                />
                <ListItem
                  primaryText="Patient 3"
                  leftAvatar={
                    <Avatar
                      backgroundColor={lightGreen300}>
                      P3
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('ENDO'))}
                />
                <ListItem
                  primaryText="Patient 4"
                  leftAvatar={
                    <Avatar
                      backgroundColor={amber300}>
                      P4
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('PNEU'))}
                />
                <ListItem
                  primaryText="Patient 5"
                  leftAvatar={
                    <Avatar
                      backgroundColor={teal200}>
                      P5
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('ALL'))}
                />
                <ListItem
                  primaryText="Patient 6"
                  leftAvatar={
                    <Avatar
                      backgroundColor={amber300}>
                      P6
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('PNEU'))}
                />
                <ListItem
                  primaryText="Patient 7"
                  leftAvatar={
                    <Avatar
                      backgroundColor={amber300}>
                      P7
                    </Avatar>
                  }
                  rightIcon={rightIconInfo(clinic('PNEU'))}
                />
                <ListItem
      		        primaryText="Patient 8"
      		        leftAvatar={
      		        	<Avatar
      		        		backgroundColor={lightGreen300}>
      		        		P8
      		        	</Avatar>
      		        }
                  rightIcon={rightIconInfo(clinic('ENDO'))}
      		      />
      		      <ListItem
      		        primaryText="Patient 9"
      		        leftAvatar={
      		        	<Avatar
      		        		backgroundColor={lightGreen300}>
      		        		P9
      		        	</Avatar>}
                  rightIcon={rightIconInfo(clinic('ENDO'))}
      		      />
      		      <ListItem
      		        primaryText="Patient 10"
      		        leftAvatar={
      		        	<Avatar
      		        		backgroundColor={amber300}>
      		        		P10
      		        	</Avatar>}
                  rightIcon={rightIconInfo(clinic('PNEU'))}
      		      />
              </div> 
           </Tab> 
          </Tabs>
		    </List>
    	)
  }
}
