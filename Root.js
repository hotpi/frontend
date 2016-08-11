import React from 'react';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';

import {
  green400,
  cyan500,
  blue800
} from 'material-ui/styles/colors';

import PatientContainer from './PatientContainer';
import PatientDetailContainer from './PatientDetailContainer';

export default class Root extends React.Component {
  componentDidUpdate(nextProps) {
    console.log('ROOT UPDATED: ', nextProps);
  }

  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={PatientContainer} />
          <Route path="/patient/:id(/:type)" component={PatientDetailContainer} />
        </Router>
      </Provider>
    	);
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired
}
