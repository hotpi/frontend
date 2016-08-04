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
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={PatientContainer} />
          <Route path="/patient/:id" component={PatientDetailContainer} />
          <Route path="/patient/:id/:type" component={PatientDetailContainer} /> 
        </Router>
      </Provider>
    	);
  }
}
