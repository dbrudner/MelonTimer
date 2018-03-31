import styled from 'styled-components'

export const ActivityInfoContainer = styled.div`
    font-size: 2.4rem;
    padding: 3rem;

    h1 {
        margin: 0;
        text-transform: uppercase;
    }

    div span {
        font-weight: 700;
    }
`

export const SessionLogContainer = styled.div`
    margin: 2rem;
    display: block;
`

export const SessionLogTable = styled.table`
    text-align: center;
    font-size: 2.0rem;
    border-collapse: collapse;
    margin: 0 auto;
    border: 5px solid black;

    td, th {
        padding: 1rem;
    }

    td {
        border: 1px solid black;
    }

    thead tr {
        border: 1px solid black;
    }

    tr:nth-child(2n+1) {
        background-color: #f3f3f3;
    }

    tr:nth-child(2n+0) {
        background-color: #d1e8ff;
    }

    th {
        background-color: #3e7bec;
        color: white;
        text-transform: uppercase;
        padding: 1rem 3rem;
    }
`