import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Button = styled.button`
    display: inline-block;
`

export default function SignupButton(props) {
    return (
        <Button onClick={props.signUp}>
                Signup
        </Button>
    )
}