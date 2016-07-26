import React from 'react';

import { List, ListItem } from 'material-ui/List';
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

import PatientOptionsList from './PatientOptionsList';

const iconStyles = {
  marginRight: 24
};

const StethoscopeIcon = (props) => (
  <FontIcon {...props}
    className="mdi mdi-stethoscope" />
);


export default class Root extends React.Component {
  render() {

    return (
    		<PatientOptionsList />
    	)
  }
}
