import React,{Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Login, openSignUp, openLogin } from '../actions/index';
import {Link} from 'react-router-dom'

import SignupButton from './signup-button'

import TextField from 'material-ui/TextField'

import RaisedButton from 'material-ui/RaisedButton'

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
        this.props.openSignUp(true)
    }

    openLoginModal = () => {
        this.props.openLogin(true)        
    }

    render() {
        return (
            <div>
                <RaisedButton 
                    label='Log In'
                    primary
                    onClick={this.openLoginModal}                    
                    style={{marginRight: '3rem'}}                    
                />
                <RaisedButton 
                    label='Signup'
                    default
                    onClick={this.signUp}
                    style={{marginRight: '3rem'}}
                />
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
    return bindActionCreators({Login, openSignUp, openLogin}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister)