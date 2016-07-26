import React from 'react';

import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { grey400 } from 'material-ui/styles/colors';

const listStyle = {
    width: '19.2em', 
    minHeight: '100vh', 
    borderRight: '0.1em #d0d0d0 solid', 
    borderBottom: 'none',
    boxShadow: '3px 0 2px #aeaeae', 
    overflowY: 'hidden', 
    overflowX: 'hidden'
};


export default class BaseList extends React.Component {
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

          {this.props.children}
        </List>
      );
  }
}