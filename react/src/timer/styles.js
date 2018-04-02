import styled from 'styled-components'

export const SessionContainer = styled.div`
    background-color: #f3f3f3;
    text-align: center;
    display: inline-block;
    width: 500px;
    padding: 2rem;
    margin: 5rem 0;
    box-shadow: .1rem .1rem 1rem #888888;
`

export const StartSession = styled.div`

    font-size: 1.6rem;
    text-transform: uppercase;
    color: #fd8181;
    font-weight: 700;
    padding: 1.5rem .5rem;
    margin-left: 2rem;
    display: inline-block;
    letter-spacing: .35rem;
    padding-left: 1.4rem;
    cursor: pointer;
    transition: all .3s;
    border: 1px solid #dbdbdb;
    box-shadow: .3rem .3rem 1rem #888888;

    :hover {
        transition: all .3s;
        transform: translateY(-.5rem);
        background-color: #fd8181;
        color: white;
    }

    :active {
        box-shadow: .1rem .1rem 1rem #888888;
        transform: translateY(0rem);
        transition: all .3s;
    }
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