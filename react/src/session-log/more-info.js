import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const MoreInfoContainer = styled.div`
    font-size: 2.4rem;
    text-align: center;
    padding: 3rem;

    h1 {
        text-transform: uppercase;
        margin: 0;
    }

    div ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    h3 {
        color: #c7c7c7;
        font-size: 2rem;
        margin: 0;
    }
`

export default function MoreInfo(props) {
    console.log(props)

    const formatTime = unixTime => {
        return moment.unix(unixTime/1000).format("HH:mm:ss A")
    }

    const renderTimes = () => {
        return props.session.times.map((sessionSegment, index) => {
            return (
                <li key={index}>
                    <strong style={{'marginRight': '1rem'}}>{index + 1}.</strong> {formatTime(sessionSegment.started)} - {formatTime(sessionSegment.finished)}
                </li>
            )
        })
    }

    const breakTime = () => {
        // wholeTime is the entire time of the session, including breaks
        // totalTime is the duration of activity without breaks

        const wholeTime = props.session.times[props.session.times.length - 1].finished - props.session.times[0].started
        console.log(wholeTime)
        console.log(props.session.totalTime)

        return wholeTime - props.session.totalTime
    }

    return (
        <MoreInfoContainer>
            <h1>{props.session.activity}</h1>
            <h3>
                <div>
                    {moment(props.session.created_at).format('MMMM Do YYYY')}
                </div>
                <div>
                    {moment(props.session.created_at).format('HH:mm a')}
                </div>
            </h3>
            <hr/>
            <h5>Sessions divided by breaks</h5>
            <div>
                <ul>
                    {renderTimes()}
                </ul>
            </div>
        </MoreInfoContainer>
    )
}