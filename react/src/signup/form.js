import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Login, openSignUp } from '../actions/index';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const FormContainer = styled.div`

    padding: 2rem 5rem;

    h1 {
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1rem;
    }
`

const Label = styled.span`
    margin-right: 3rem;
`

const SubmitButton = styled.button``


class Form extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: '',
                password: '',
                password_again: '',

            },
            error: null
        }
    }

    renderInput = name => {
        let label = name.charAt(0).toUpperCase() + name.substr(1)
        label = label.replace('_', ' ')

        const styles = {
            unerlineStyle: {
                color: 'black'
            },

            floatingLabelStyle: {
                color: 'black'
            }
        }

        return (
            <div>
                <TextField
                    hintText={label}
                    floatingLabelText={label}
                    onChange={event => this.handleChange(name, event.target.value)}
                    value={this.state.user[name]}
                    floatingLabelStyle={{color: 'black'}}
                />
            </div>
        )
    }

    renderAllInputs = () => {
        return Object.keys(this.state.user).map(item => {
            return <div key={item}>{this.renderInput(item)}</div>
        })
    }

    handleChange = (name, value) => {this.setState({user: {...this.state.user, [name]: value}})}

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
        if (this.state.user.password !== this.state.user.password_again) {
            return this.setState({error: "Passwords don't match"})
        }

        const user = this.state.user

        axios.post('/signup', user)
        .then(res => {
            console.log('sign up success')
            axios.get('/test')
            .then(res => {
                this.props.Login(res.data)
                this.props.closeModal()
            })

        }).catch (err => {
            this.setState({
                error: 'Username taken'
            })
            throw err
        })
    }

    render() {
        return (
            <FormContainer>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderAllInputs()}
                    <div>
                        {this.state.error || null}
                    </div>
                    <RaisedButton
                        primary
                        label='Create Account'
                        fullWidth
                        style={{marginTop: '5rem'}}
                        type='submit'
                    />
                </form>
            </FormContainer>
        )
    }
}


function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({Login, openSignUp}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)