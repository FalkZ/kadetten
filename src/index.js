import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import App from './App'

import MuiTheme from './MuiTheme'

import './index.styl'

ReactDOM.render(
	<MuiThemeProvider muiTheme={getMuiTheme(MuiTheme)}>
		<App />
	</MuiThemeProvider>,
	document.getElementById('root')
)
registerServiceWorker()
