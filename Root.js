import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import ActionTouchApp from 'material-ui/svg-icons/action/touch-app';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import EditorHighlight from 'material-ui/svg-icons/editor/highlight';
import ContentMoveToInbox from 'material-ui/svg-icons/content/move-to-inbox';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

import {
green400,
cyan500,
blue800
} from 'material-ui/styles/colors';

import PatientOptionsList from './PatientOptionsList';
import PatientHeader from './PatientHeader';

const iconStyles = {
  width: '18px',
  height: '18px',
  fontSize: '18px',
  padding: '0 3em 0 0',
  color: 'grey'
};


//TODO: Object assign?
const cancelIconStyle = {
  width: '18px',
  height: '18px',
  fontSize: '18px',
  padding: '0.7em 1.5em 0 1em',
  color: 'grey',
  position: 'absolute'
}

const headerStylesDesktop = {
  height: '154px',
  backgroundColor: blue800,
  width: '76vw',
  left: '19.2em'
};

const headerStylesMobile = {
  height: '154px',
  backgroundColor: blue800,
  width: '70vw',
  left: '19.2em'
};

export default class Root extends React.Component {
  render() {

    return (
        <div style={{display: 'inline-flex'}}>
          <PatientOptionsList />
          <div style={{display: 'block'}}>
        		<PatientHeader />
            <div style={{margin: '3em 8em'}}>
              {/* TODO: Begin the note component
                  Add dynamic height
                   */}
              <Paper
                zDepth={2}
                style={{left: '19.2em', width: '470px', height: '430px'}}>
                <h3 style={{padding: '1em 2em', margin: '0', color: 'black', fontWeight: '200'}}>New note</h3>
                <Divider />
                {/*Begings the note line component*/}
                <div style={{padding: '1em 3em'}}>
                  <div style={{display: 'inline', marginBottom: '0',}}>
                    <TextField 
                      hintText={'Write here to start a new line'}
                      rows={1}
                      multiLine={true}
                      underlineShow={false} 
                      textareaStyle={{paddingBottom: '0'}}
                      style={{marginRight: '0.5em', width: '97%'}} />
                    <NavigationCancel style={cancelIconStyle} />
                  </div>
                  <div style={{width: '100%', top: '-50px', margin: '0'}}>
                    <ActionTouchApp style={iconStyles} />
                    <ToggleStar style={iconStyles} />
                    <ContentMoveToInbox style={iconStyles} />
                    <NavigationMoreVert style={iconStyles} /> 
                  </div>
                </div>
                {/*Ends the note line component*/}

                <Divider />
                {/*TODO: Add note actions*/}


              </Paper>
              {/*Ends the note component*/}
            </div>
          </div>
        </div>
    	);
  }
}
