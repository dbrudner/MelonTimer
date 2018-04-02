import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const HomeContainer = styled.div`
    h1 {
        text-align: center;
        font-size: 4.8rem;
    }

    h3 {
        text-align: center;
        font-size: 2.4rem;
        color: gray;
        font-style: italic;
    }

    p {
        text-align: center;
        color: gray;
        font-size: 1.6rem;
    }
`

export default class Home extends Component {

    render() {
        return (
            <HomeContainer>
                <h1>Welcome to MelonTimer</h1>
                <h3>
                    Keep track and record lengths of time for anything you're doing
                </h3>
                <p>
                    Log in or Sign Up and click <strong>Start New Session</strong> to get started                    
                </p>

            </HomeContainer>
        )
    }
}