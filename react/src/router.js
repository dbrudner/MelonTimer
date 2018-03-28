import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import SignUp from './signup'
import Login from './login'
import Home from './home'
import Logout from './logout'

class App extends Component {
    render() {
		return (
            <Router>
                <div>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/logout' component={Logout} />                    
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/' component={Home} />
                </div>
            </Router>
		);
    }
}

export default App;