import React from 'react';

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
            
            <ListItem 
              primaryText="Back"
              leftIcon={<NavigationChevronLeft />}
              />
            <Divider />

            <Subheader inset={true}>Patient Information</Subheader>
            <ListItem
              primaryText="New note"
              leftIcon={
                <AvLibraryAdd
                  color={green400} />
              }
              style={{padding: '5px 0'}}
            />
            <ListItem
              primaryText="Diagnosis"
              leftIcon={
                <StethoscopeIcon
                  style={{color: deepPurple600}} />
              }
              style={{padding: '5px 0'}}
            />
            <ListItem
              primaryText="History"
              leftIcon={
                <ActionHistory
                  color={pink500} />
              }
              style={{padding: '5px 0'}}
            />
            <ListItem
              primaryText="ToDo"
              leftIcon={
                <ActionAssignment
                  color={cyan500} />
              }
              style={{padding: '5px 0'}}
            />  
          </div>  
		    </BaseList>
    	)
  }
}
