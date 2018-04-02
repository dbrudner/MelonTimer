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
        background-color: #f6a0a0;
    }

    tr:nth-child(2n+0) {
        background-color: #c6ffd8;
    }

    th {
        background-color: black;
        color: white;
        text-transform: uppercase;
        padding: 1rem;
    }
`

export const Info = styled.div`
    display: inline-block;
    color: #8888ff;
    cursor: pointer;
    transition: all .3s;
    text-transform: uppercase;
    background-color: white;
    padding: .3rem 1rem;
    border-radius: 5px;
    border: 1px solid #b4b3b3;
    font-size: 1.6rem;
    width: 5rem;

    :hover {
        opacity: 1;
        transition: all .3s
        color: white;
        background-color: #8888ff;
    }
`

export const Delete = styled.div`
    display: inline-block;
    border: 1px solid #b4b3b3;
    color: #cc7878;
    cursor: pointer;
    transition: all .3s;
    text-transform: uppercase;
    background-color: white;
    padding: .3rem 1rem;
    border-radius: 5px;
    font-size: 1.6rem;
    width: 5rem;
    :hover {
        opacity: 1;
        transition: all .3s
        color: white;
        background-color: #cc7878;
    }
`