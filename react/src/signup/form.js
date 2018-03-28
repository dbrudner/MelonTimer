import React, {Component} from 'react'
import axios from 'axios'
import styled from 'styled-components'

export default class Form extends Component {

    constructor(props) {
        super(props)

        this.state= {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (name, value) => {
        this.setState({[name]: value}, () => {
            console.log(this.state)
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const username = this.state.username.trim()
        const email = this.state.email.trim()
        const password = this.state.password.trim()

        if (username && email && password) {
            axios.post('/signup', {username, email, password})
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.username} type='text' onChange={event => {this.handleChange('username', event.target.value)}}/>
                <input value={this.state.email} type='text' onChange={event => {this.handleChange('email', event.target.value)}}/>
                <input value={this.state.password} type='password' onChange={event => {this.handleChange('password', event.target.value)}}/>
                <button type='submit'>Button</button>
            </form>
        )
    }
}