import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin';

import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
//import Root from './containers/Root'
import Root from './Root'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import configureStore from './configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

injectTapEventPlugin();

render(
	<MuiThemeProvider style={{height: '100vh', width: '100%'}}>
		<Root 
      history={history} 
      store={store} 
      />
	</MuiThemeProvider>,
  document.getElementById('app')
)