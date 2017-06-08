import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/App';
import PatientContainer from './containers/PatientContainer';
import PatientDetailContainer from './containers/PatientDetailContainer';
import PatientDetailChronologyContainer from './containers/PatientDetailChronologyContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PatientContainer} />
    <Route path="/patients" component={PatientContainer} />
    <Route
      path="/patient/:patientId(/:type)"
      component={PatientDetailContainer}
    />
    <Route path="/review/:patientId(/:type)" component={PatientDetailChronologyContainer} />
  </Route>
);
