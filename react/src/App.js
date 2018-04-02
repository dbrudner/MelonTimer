import React, { Component } from 'react';
import Router from './router'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class App extends Component {
    render() {
		return (
            <div>
                <Provider store={createStoreWithMiddleware(reducers)}>
                    <MuiThemeProvider>
                        <Router/>
                    </MuiThemeProvider>
                </Provider>
            </div>
		);
    }
}

export default App;