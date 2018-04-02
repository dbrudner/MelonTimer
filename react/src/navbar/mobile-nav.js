import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Login, logout, openSignUp, openLogin } from '../actions';

import LoginOrRegister from './login-or-register'
import UserInfo from './user-info'
import Signup from '../signup/signup'
import LoginModal from '../login-modal/login'

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


const NavbarContainer = styled.div`
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    padding: 2rem;
    border-bottom: 5px solid black;
`

const NavBanner = styled.div`
    background-color: red;
    text-align: center;
    background-color: #c6ffd8;
    color: white;
    font-size: 3.6rem;
    font-weight: 700;
`

const Brand = styled.div`
    display: inline-block;

    a {
        color: #c6ffd8;
        text-decoration: none;
        font-weight: 700;
        border-radius: 5px;
        font-size: 2.6rem;
        background-color: #f6a0a0;
        padding: 1rem;
    }
`

const NavLinks = styled.div`
    display: inline-block;
    margin-left: 2rem;

    ul {
        display: inline-block;
        margin: 0;
        padding: 0;

        li {
            display: inline-block;
            margin-left: 2rem;

            &:first-child {
                margin-left: 0;
            }

            a {
                text-decoration: none;
                display: inline-block;
                transition: all .3s;
                font-weight: 700;

                :hover {
                    color: #ffc100;
                    transition: all .3s;
                    transform: translateY(-1rem);
                }
            }
        }
    }
`

const UserContainer = styled.div`
    display: inline-block;
    margin-right: 3rem;
    margin-top: .8rem;

    ul {
        margin: 0;
        padding: 0;

        li {
            display: inline-block;
        }
}`

class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state ={
            username: '',
            password: '',
            loginCheck: null,
            openMenu: false,
            openSignUp: false,
            redirect: null
        }
    }

    componentDidMount() {

        // I make this request because if a user navigates away from the site or reloads, app state is lost, but session is still in storage.
        // This makes it so a user doesn't have to re login after leaving or reloading site.
        // ****On navbar, so this request happens on everytime this component mounts. I don't know if this is good or bad. Sounds like overkill?
        // Commented out because this request invokes an error in jest
        axios.get('/test')
            .then(res => {
                if (res.data) {
                    this.props.Login({...res.data, _id: res.data._id})
                } else console.log('not logged in')
                this.setState({loginCheck: true})
            })
    }

    logout = () => {
        axios.get('/logout')
        .then(res => {
            console.log(res)
            this.props.logout();
        })
    }

    // If a user is logged in, they'll see their username and a log out button
    // If a user isn't logged in, they'll see buttons to login or register
    renderInfoOrLogin = () => {
        // Prevents quick flashing text before login check is made
        if (!this.state.loginCheck) return null

        if (this.props.state.user) {
            return  <UserInfo logout={this.logout} userInfo={{...this.props.state.user}}/>
        } else {
            return <LoginOrRegister/>
        }
    }

    openMenu = event => {
        console.log('hi')
        this.setState({openMenu: true, anchorEl: event.currentTarget})
    }

    openLogin = () => {
        this.props.openLogin(true) 
        this.setState({openMenu: false})
    }

    openSignUp = () => {
        this.props.openSignUp(true)
        this.setState({openMenu: false})        
    }

    renderMenu = () => {
        if (this.props.state.user) {
            return (
                <Menu>
                    <Link to='/home'><MenuItem primaryText="Home" /></Link>
                    <Link to='/sessions'><MenuItem primaryText="Session Logs" /></Link>
                    <Link to='/session'><MenuItem primaryText="Start New Session" /></Link>
                    <MenuItem primaryText="Sign Out" />
                </Menu>
            )
        }
        return (
            <Menu>
                <MenuItem primaryText="Home" >
                </MenuItem>
                <MenuItem primaryText="Login" onClick={this.openLogin}/>
                <hr/>
                <MenuItem primaryText="Sign Up" onClick={this.openSignUp} />
            </Menu>
        )
    }

    render() {
        return (
            <div>
                {this.props.state.openSignUp ? <Signup /> : null}
                {this.props.state.openLogin ? <LoginModal /> : null}
                <NavbarContainer>
                    <UserContainer>
                        <div style={{marginRight: '3rem'}}>
                        <span onClick={this.openMenu}>
                            <i className="fas fa-bars" ></i>
                            <Popover
                                open={this.state.openMenu}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={() => this.setState({openMenu: false})}
                            >
                            {this.renderMenu()}
                            </Popover>
                        </span>

                        </div>
                    </UserContainer>
                </NavbarContainer>
                <NavBanner>
                    <span style={{color: '#ff8585'}}>Melon</span>
                    <span style={{color: 'black'}}>Timer</span>
                </NavBanner>
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
    return bindActionCreators({Login, logout, openSignUp, openLogin}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)