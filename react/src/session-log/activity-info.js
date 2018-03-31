import React from 'react'
import {ActivityInfoContainer} from './styles'

export default function ActivityInfo(props) {

    const activities = props.sessions.filter(session => {
        return session.activity.toLowerCase() === props.activity.toLowerCase()
    })

    const sessions = activities.length

    const longestSession = activities.reduce((acc, session) => {
        if (session.totalTime > acc) return acc = session.totalTime
        else return acc
    }, 0)

    const totalSessionTime = activities.reduce((acc, session) => {
        return acc + session.totalTime
    }, 0)

    const averageSessionTime = Math.floor(totalSessionTime/sessions)

    return (
        <ActivityInfoContainer>
            <h1 className='text-center'>
                {props.activity.charAt(0).toUpperCase() + props.activity.substr(1)}
            </h1>
            <hr/>
            <div>
                <span>Total Sessions: </span> {sessions}
            </div>
            <div>
                <span>Longest Session: </span>{props.convertTime(longestSession)}
            </div>
            <div>
                <span>Average Session: </span>{props.convertTime(averageSessionTime)}            
            </div>
        </ActivityInfoContainer>
    )
}