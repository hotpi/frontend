import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import DevTools from '../DevTools';
import routes from '../../routes';

class Root extends React.Component {
  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <div
          style={{
            width: '100%'
          }}
          >
          <Router history={history} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired
};

export default Root;
