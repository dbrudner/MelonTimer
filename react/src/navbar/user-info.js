import React from 'react'
import styled from 'styled-components'

import {Link} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'


const Logout = styled.div`
    font-size: 1.6rem;
    text-transform: uppercase;
    color: #fd8181;
    font-weight: 700;
    padding: .5rem;
    display: inline-block;
    letter-spacing: .35rem;
    padding-left: 1.4rem;
    cursor: pointer;

    :hover {
        transition: all .3s;
        transform: translateY(-.5rem);
    }
`

const UserInfoContainer = styled.div`
    
`

const User = styled.div`
    display: inline-block;
    margin-right: 3rem;
    font-style: italic;
    color: gray;
` 

export default function UserInfo(props) {
    return (
        <UserInfoContainer>
            <User>
                Signed in as {props.userInfo.username}
            </User>
            <Logout onClick={props.logout}>
                Logout
            </Logout>
        </UserInfoContainer>
    )
}