import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import EmergencyCallButton from '../components/content/top-view/EmergencyCallButton';

import { getIsFetching, getIsSynced } from '../reducers/index';
import { updateBoth } from '../actions/dimensions';

class App extends Component {
  componentWillMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.props.updateBoth(window.innerHeight, window.innerWidth);
  }

  handleClick() {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
        <EmergencyCallButton />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  type: PropTypes.string,
  updateBoth: PropTypes.func
};

const mapStateToProps = (state, { params }) => {
  return {
    isSynced: getIsSynced(state),
    isLoading: getIsFetching(state),
    type: params.type
  };
};

export default withRouter(connect(mapStateToProps, { updateBoth })(App));
