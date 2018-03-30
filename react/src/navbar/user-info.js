import React from 'react'
import styled from 'styled-components'

import {Link} from 'react-router-dom'

const UserInfoContainer = styled.div`
    ul li {
        margin-right: 1rem;
        cursor: pointer;
    }
`

export default function UserInfo(props) {
    return (
        <UserInfoContainer>
            <ul>
                <li>{props.userInfo.username}</li>
                <li onClick={props.logout}>Logout</li>
            </ul>
        </UserInfoContainer>
    )
}