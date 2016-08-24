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

import { fetchData } from './actions/sync';

class Root extends React.Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={PatientContainer} />
          <Route path="/patients" component={PatientContainer} />
          <Route path="/patient/:patientId(/:type(/:noteNumber))" component={PatientDetailContainer} />
        </Router>
      </Provider>
    	);
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired
}

export default Root;