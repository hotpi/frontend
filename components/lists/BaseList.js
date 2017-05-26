import React from 'react';

import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';

import AddPatientForm from '../content/top-view/AddPatientForm';

import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import {
grey400,
green100,
red100
} from 'material-ui/styles/colors';

import { listStyle } from '../helpers/Helpers';

import { connectionMonitor } from '../../index';

class BaseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      width: props.width,
      drawerWidth: this.calculateDrawerWidth(),
      colorState: (connectionMonitor.getConnectionStatus() === 'up' ?
        green100 :
        red100
      )
    };

    this.disconnectListener = connectionMonitor.listenToEvent(
      'disconnected',
      [ this.setBackgroundColor.bind(this, 'red') ]
    );

    this.reconnectListener = connectionMonitor.listenToEvent(
      'reconnected',
      [ this.setBackgroundColor.bind(this, 'green') ]
    );
  }

  setBackgroundColor(color) {
    this.setState({ colorState: (color === 'green' ?
      green100 :
      red100
    ) });
  }

  calculateDrawerWidth() {
    return [ 1023, 640, 300 ].reduce((prev, current, index) => {
      return window.innerWidth > current && prev === 0 ?
        window.innerWidth / (Math.max(4 - (index * Math.pow(2, index - 1)), 1)) :
        prev;
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      width: nextProps.width,
      drawerWidth: this.calculateDrawerWidth()
    });
  }

  handleOpen() {
    this.setState({
      isOpen: true
    });
  }

  handleClose() {
    this.setState({
      isOpen: false
    });
  }

  handleDrawer() {
    this.setState({
      drawerOpen: false
    });
  }

  getOffset() {
    let offset = 0;

    if (this.state.width < 640 && this.state.width > 400) {
      offset = this.state.drawerWidth / 1.55;
    } else if (this.state.width < 400) {
      offset = this.state.drawerWidth / 1.4;
    } else {
      offset = this.state.drawerWidth / 4.5;
    }

    return offset;
  }

  render() {
    return (
        <Drawer
          className="hide-for-small-only"
          docked={this.state.width >= 640}
          open={this.props.isDrawerOpen || this.state.width >= 640}
          width={this.state.drawerWidth}
          >
          <List style={listStyle}>
            <Paper
              zDepth={0}
              style={{
                height: '60px',
                width: '100%',
                margin: '0',
                paddingTop: 10,
                backgroundColor: this.state.colorState
              }}
            >
              <div className="column row">
                  <div className="small-1">
                    <IconButton
                      tooltip="add patient"
                      tooltipPosition="top-right"
                      onTouchTap={this.handleOpen.bind(this)}>
                      <ContentAdd color={grey400} />
                    </IconButton>
                  </div>
                  <div
                    className="small-1 small-offset-5 show-for-small-only"
                    >
                    <IconButton
                      onTouchTap={this.props.onClickDo}
                      style={{
                        margin: 0,
                        padding: 0,
                        height: 24
                      }}
                    >
                      <NavigationMenu color={grey400} />
                    </IconButton>
                  </div>
                  <Dialog
                    title="New Patient"
                    titleStyle={{
                      fontWeight: 100,
                      padding: '16px 24px'
                    }}
                    open={this.state.isOpen}
                    onRequestClose={this.handleClose.bind(this)}
                    contentStyle={{
                      width: 380
                    }}
                    autoScrollBodyContent={true}
                    >
                    <AddPatientForm
                      closeDialog={() => this.handleClose()}
                      />
                  </Dialog>
                  <div>
                    <IconButton
                      tooltip="more"
                      tooltipPosition="top-right"
                      style={{
                        left: this.state.drawerWidth - this.getOffset()
                      }}
                    >
                      <NavigationMoreVert color={grey400} />
                    </IconButton>
                  </div>
                </div>
            </Paper>
            <Divider style={{
              height: '6px',
              border: 0,
              boxShadow: 'inset 0 12px 12px -12px rgba(0, 0, 0, 0.5)'
            }}
            />
            {this.props.children}
          </List>
        </Drawer>
    );
  }
}

BaseList.propTypes = {
  width: React.PropTypes.number,
  isDrawerOpen: React.PropTypes.bool,
  onClickDo: React.PropTypes.func,
  children: React.PropTypes.array
};

export default BaseList;
