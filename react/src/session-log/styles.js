import styled from 'styled-components'

export const SessionLogContainer = styled.div`
    margin: 2rem;
    display: block;
`

export const SessionLogTable = styled.table`
    text-align: center;
    font-size: 1.6rem;
    border-collapse: collapse;
    margin: 0 auto;

    td, th {
        padding: 1rem;
        border: 1px solid black;
    }

    tr:nth-child(2n+1) {
        background-color: #f3f3f3;        
    }

    tr:nth-child(2n+0) {
        background-color: #c7c7c7;
    }

    th {
        background-color: black;
        color: white;
        text-transform: uppercase;
        padding: 1rem 3rem;
    }
`