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

import BaseList from './BaseList';

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
    		<BaseList>
          <Tabs style={{marginTop: '0'}} tabItemContainerStyle={{borderRight: '1px #aeaeae solid'}}>
            <Tab label='Station 28'>
              <div style={{overflowY: 'hidden'}}>
                <div style={{height: '535px', overflowY: 'auto', marginBottom: '0'}}>

                  <Subheader inset={true}>Patients</Subheader>
                  <ListItem
                    primaryText="Patient 1"
                    secondaryText={
                      <p>
                        <i className="mdi mdi-cake"></i> 
                        <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                      </p>  
                    }
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
                    secondaryText={
                      <p>
                        <i className="mdi mdi-cake"></i> 
                        <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                      </p>  
                    }
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
                    secondaryText={
                      <p>
                        <i className="mdi mdi-cake"></i> 
                        <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                      </p>  
                    }
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
                    secondaryText={
                      <p>
                        <i className="mdi mdi-cake"></i> 
                        <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                      </p>  
                    }
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
                    secondaryText={
                      <p>
                        <i className="mdi mdi-cake"></i> 
                        <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                      </p>  
                    }
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
                    secondaryText={
                      <p>
                        <i className="mdi mdi-cake"></i> 
                        <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                      </p>  
                    }
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
                    secondaryText={
                      <p>
                        <i className="mdi mdi-cake"></i> 
                        <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                      </p>  
                    }
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
                    secondaryText={
                      <p>
                        <i className="mdi mdi-cake"></i> 
                        <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                      </p>  
                    }
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
                    secondaryText={
                      <p>
                        <i className="mdi mdi-cake"></i> 
                        <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                      </p>  
                    }
                    leftAvatar={
                      <Avatar
                        backgroundColor={lightGreen300}>
                        P9
                      </Avatar>}
                    rightIcon={rightIconInfo(clinic('ENDO'))}
                  />
                  <ListItem
                    primaryText="Patient 10"
                    secondaryText={
                      <p>
                        <i className="mdi mdi-cake"></i> 
                        <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                      </p>  
                    }
                    leftAvatar={
                      <Avatar
                        backgroundColor={amber300}>
                        P10
                      </Avatar>}
                    rightIcon={rightIconInfo(clinic('PNEU'))}
                  />
                  </div> 
              </div> 
           </Tab> 
            <Tab label='Station 29'>
              <div style={{overflow: 'hidden'}}>
              <div style={{overflowY: 'auto'}}>

                <Subheader inset={true}>Patients</Subheader>
      		      <ListItem
                  primaryText="Patient 1"
                  secondaryText={
                    <p>
                      <i className="mdi mdi-cake"></i> 
                      <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                    </p>  
                  }
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
                  secondaryText={
                    <p>
                      <i className="mdi mdi-cake"></i> 
                      <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                    </p>  
                  }
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
                  secondaryText={
                    <p>
                      <i className="mdi mdi-cake"></i> 
                      <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                    </p>  
                  }
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
                  secondaryText={
                    <p>
                      <i className="mdi mdi-cake"></i> 
                      <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                    </p>  
                  }
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
                  secondaryText={
                    <p>
                      <i className="mdi mdi-cake"></i> 
                      <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                    </p>  
                  }
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
                  secondaryText={
                    <p>
                      <i className="mdi mdi-cake"></i> 
                      <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                    </p>  
                  }
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
                  secondaryText={
                    <p>
                      <i className="mdi mdi-cake"></i> 
                      <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                    </p>  
                  }
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
      		        secondaryText={
                    <p>
                      <i className="mdi mdi-cake"></i> 
                      <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                    </p>  
                  }
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
      		        secondaryText={
                    <p>
                      <i className="mdi mdi-cake"></i> 
                      <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                    </p>  
                  }
                  leftAvatar={
      		        	<Avatar
      		        		backgroundColor={lightGreen300}>
      		        		P9
      		        	</Avatar>}
                  rightIcon={rightIconInfo(clinic('ENDO'))}
      		      />
      		      <ListItem
      		        primaryText="Patient 10"
      		        secondaryText={
                    <p>
                      <i className="mdi mdi-cake"></i> 
                      <span style={{paddingLeft: '5px'}}>21.12.1991</span>
                    </p>  
                  }
                  leftAvatar={
      		        	<Avatar
      		        		backgroundColor={amber300}>
      		        		P10
      		        	</Avatar>}
                  rightIcon={rightIconInfo(clinic('PNEU'))}
      		      />
              </div> 
              </div> 
           </Tab> 
          </Tabs>
		    </BaseList>
    	)
  }
}
