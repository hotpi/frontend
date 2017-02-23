import React from 'react';

import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';

import AddPatientForm from '../content/top-view/AddPatientForm';

import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import { grey400, blue700 } from 'material-ui/styles/colors';

import { listStyle } from '../helpers/Helpers';

class BaseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      width: window.innerWidth,
      drawerOpen: false
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }


  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    this.setState({
      drawerOpen: this.state.drawerOpen
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log(nextProps, this.state.drawerOpen, nextState)
    this.setState({
      drawerOpen: nextProps.isDrawerOpen
    })
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, drawerOpen: window.innerWidth >= 640 });
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

  handleDrawer() {
    this.setState({
      drawerOpen: false
    })
  }

  render() {
    return (
        <Drawer
          className="hide-for-small-only"
          docked={this.state.width >= 640}
          open={this.state.drawerOpen || this.state.width >= 640}
          width={this.state.width > 1027 ? this.state.width/4 : this.state.width/3}
          >
          <List style={listStyle}>
            <Paper
              zDepth={0}
              style={{height: '60px', width: '100%', margin: '0', paddingTop: 10}}>
                

                <div className="column row">
                  <div className="small-1">
                    <IconButton
                      tooltip="add patient"
                      tooltipPosition="top-right"
                      onClick={this.handleOpen.bind(this)}>
                      <ContentAdd color={grey400} />
                    </IconButton>
                  </div>
                  <div 
                    className="small-1 small-offset-4 show-for-small-only"
                    >
                    <IconButton
                        onClick={this.handleDrawer.bind(this)}
                        style={{margin: 0, padding: 0, height: 24}}
                        >
                        <NavigationMenu color={grey400} />
                    </IconButton>
                  </div>
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
                  <div className="small-1 medium-1 large-2 small-offset-3 medium-offset-9 large-offset-9">
                    <IconButton
                      tooltip="more"
                      tooltipPosition="top-right"
                      style={{left: '68%'}}>
                      <NavigationMoreVert color={grey400} />
                    </IconButton>
                  </div>  
                </div>  
            </Paper>  
            <Divider style={{height: '6px', border: 0, boxShadow: 'inset 0 12px 12px -12px rgba(0, 0, 0, 0.5)'}}/>
            {this.props.children} 
          </List>
        </Drawer>
      );
  }
}

export default BaseList;