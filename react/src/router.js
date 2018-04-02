import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Home from './home/home'
import NavMediaQuery from './navbar/nav-media-query'
import Session from './timer/session'
import SessionLog from './session-log/session-log'

class App extends Component {
    render() {
		return (
            <Router>
                <div>
                    <NavMediaQuery/>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/session' component={Session} />
                    <Route exact path='/sessions' component={SessionLog} />
                </div>
            </Router>
		);
    }
}

export default App;