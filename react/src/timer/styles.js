import styled from 'styled-components'

export const SessionContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;

    div {
        background-color: #f3f3f3;
        text-align: center;
        display: inline-block;
        padding: 1rem;
        border-radius: 5px;
        border: solid #c7c7c7 1px;
        font-size: 3.2rem;

        div {
            display: block;
            border: none;
        }
    }
`

export const StartTimer = styled.button`
    margin-top: 3rem;
`

export const Timer = styled.div`

    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        border-radius: 5px;
        padding: 2rem;        
        display: inline-block;
        background-color: #f3f3f3;
        text-align: center;
        font-size: 3.8rem;
    }
`

export const Buttons = styled.div`
    display: block !important;
    button {
        text-align: center;
        margin: 1rem;
    }
`