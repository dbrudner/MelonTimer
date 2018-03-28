import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Home from './home/home'
import Navbar from './navbar/navbar'
import Timer from './timer/timer'

class App extends Component {
    render() {
		return (
            <Router>
                <div>
                    <Navbar/>
                    <Route exact path='/' component={Timer} />
                </div>
            </Router>
		);
    }
}

export default App;