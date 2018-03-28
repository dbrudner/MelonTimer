import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedIn: null,
            username: ''
        }
    }

    componentDidMount() {
        axios.get('/test').then(res => {
            console.log(res)

            if (res.data.local) {
                
                const username = res.data.local.username
                this.setState({username, loggedIn: true})
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.username}
                <button style={{margin: '50px'}}>
                    {this.state.loggedIn ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
                </button>
                <button>
                    <Link to="/signup">Signup</Link>                          
                </button>
            </div>
        )
    }

}