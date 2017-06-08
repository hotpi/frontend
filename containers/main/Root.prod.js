import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import routes from '../../routes';

class Root extends React.Component {
  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired
};

export default Root;
