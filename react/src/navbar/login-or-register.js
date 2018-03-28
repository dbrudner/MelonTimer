import React,{Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Login } from '../actions/index';
import {Link} from 'react-router-dom'

import SignupButton from './signup-button'

const SignupButtonContainer = styled.div`
    display: inline-block;
`

const Form = styled.form`
    display: inline-block;
`

class LoginOrRegister extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            redirect: false,
            loginFail: false
        }
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleSubmit = event => {
        event.preventDefault();
        const username = this.state.username.trim()
        const password = this.state.password.trim()

        axios.post('/login', {
            username, password
        })
        .then(res => {
            axios.get('/test')
            .then(res => {
                if (res.data) {
                    this.setState({loginFail: false})
                    this.props.Login({...res.data, _id: res.data._id})
                } else {
                    this.setState({loginFail: true})
                }
            })
        })
        .catch(err => {
            console.log(err)
            
            this.setState({loginFail: true})
        })
    }

    signUp = () => {
        console.log('hi')
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    {this.state.loginFail ? <span>Wrong username or password</span> : null}
                    <input value={this.state.username} type='text' onChange={event => {this.handleChange('username', event.target.value)}}/>
                    <input value={this.state.password} type='password' onChange={event => {this.handleChange('password', event.target.value)}}/>
                    <button type='submit'>Login</button>
                </Form>
                <SignupButtonContainer>
                    <button onClick={this.signUp}> Sign up </button>
                </SignupButtonContainer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({Login: Login}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister)