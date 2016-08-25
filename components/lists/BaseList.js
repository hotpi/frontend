import React from 'react';

import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { grey400, blue700 } from 'material-ui/styles/colors';

import { listStyle } from '../helpers/Helpers';

class BaseList extends React.Component {
  render() {
    return (
        <List style={listStyle}>
          <Paper
            zDepth={0}
            style={{height: '88px', width: '100%', margin: '0', paddingTop: '24px'}}>
              <h3 style={{textAlign: 'center', paddingBottom: '0px', margin: '0'}}>Something</h3>
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
          <Divider style={{height: '6px', border: 0, boxShadow: 'inset 0 12px 12px -12px rgba(0, 0, 0, 0.5)'}}/>
          {this.props.children} 
        </List>
      );
  }
}

export default BaseList;