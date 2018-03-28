import React from 'react'
import styled from 'styled-components'


export default function NotSignedIn() {

    const NotSignedIn = styled.div`
        text-align: center;

        h2 {
            font-size: 2.6rem;
        }
    `

    return (
        <NotSignedIn>
            <h2>Please sign up or log in to continue</h2>
        </NotSignedIn>
    )
}