import React from 'react';
import { Link } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FontIcon from 'material-ui/FontIcon';

import AvLibraryAdd from 'material-ui/svg-icons/av/library-add';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionHistory from 'material-ui/svg-icons/action/history';

import {
green400,
deepPurple600,
cyan500,
pink500
} from 'material-ui/styles/colors';

import BaseList from './BaseList';

const StethoscopeIcon = (props) => (
  <FontIcon {...props}
    className="mdi mdi-stethoscope" />
);

export default class PatientOptionsList extends React.Component {
  render() {

    return (
    		<BaseList>
          <div style={{overflowY: 'auto', border: 'none'}}>
            <Link to="/" style={{textDecoration: 'none'}}>
              <ListItem 
                primaryText="Back"
                leftIcon={<NavigationChevronLeft />} >
              </ListItem>
            </Link>
            <Divider />

            <Subheader inset={true}>Patient Information</Subheader>
            <Link to="/patient/1/Diagnosis" style={{textDecoration: 'none'}}>
              <ListItem
                primaryText="Diagnosis"
                leftIcon={
                  <StethoscopeIcon
                    style={{color: deepPurple600}} />
                }
                style={{padding: '5px 0'}}
              />
            </Link>
            <Link to="/patient/1/History" style={{textDecoration: 'none'}}>
              <ListItem
                primaryText="History"
                leftIcon={
                  <ActionHistory
                    color={pink500} />
                }
                style={{padding: '5px 0'}}
              />
            </Link>
            <Link to="/patient/1/ToDo" style={{textDecoration: 'none'}}>
              <ListItem
                primaryText="ToDo"
                leftIcon={
                  <ActionAssignment
                    color={cyan500} />
                }
                style={{padding: '5px 0'}}
              />  
            </Link>
            
          </div>  
		    </BaseList>
    	)
  }
}
