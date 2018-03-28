import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';


export default class Logout extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            fireRedirect: null
        }
    }

    componentWillMount() {
        axios.get('/logout')
            .then(response => {
                console.log(response);
                this.setState({
                    fireRedirect: true
                })
            })
    }
    
    render() {
        return <Redirect to={{ pathname: '/' }} />
    }  
}