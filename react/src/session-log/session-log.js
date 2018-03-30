import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import {SessionLogContainer, SessionLogTable} from './styles'

class SessionLog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sessions: []
        }
    }

    getSessions = userId => {
        axios.get(`/sessions/${userId}`)
        .then(res => {
            let sessions = res.data
            sessions = sessions.map(session => {
                console.log(session)
                const totalTime = session.times.reduce((acc, sessionSegment) => {
                    return acc + sessionSegment.finished - sessionSegment.started
                }, 0)
                return {
                    ...session,
                    totalTime
                }
            })
            this.setState({sessions})
        })
    }

    componentDidMount() {
        if (this.props.state.user) {
            this.getSessions(this.props.state.user._id)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.getSessions(nextProps.state.user._id)
        
    }

    convertTime = ms => {
        let seconds = Math.floor(ms/1000)
        if (seconds < 60) {
            return `${seconds} Seconds`
        } else {
            let minutes = Math.floor(seconds/60)
            seconds = seconds % 60

            if (minutes >= 60) {
                const hours = Math.floor(minutes/60)
                minutes = minutes % 60;

                return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
            } else {
                return `${minutes} minutes, ${seconds} seconds`
            }
        }
        
    }

    renderSessions = () => {
        const sessionRows = this.state.sessions.map(session => {
            const time = this.convertTime(session.totalTime)

            const startDate = moment.unix(session.times[0].started/1000).format("MM/DD/YYYY")
            const finishDate = moment.unix(session.times[session.times.length-1].finished/1000).format("MM/DD/YYYY")

            const startTime = moment.unix(session.times[0].started/1000).format("HH:mm, A")
            const finishTime = moment.unix(session.times[session.times.length-1].finished/1000).format("HH:mm A")

            return (
                <tr key={session.created_at}>
                    <td>{startDate}</td>
                    <td>{session.activity}</td>
                    <td>{time}</td>
                    <td>
                        <div>{startTime}</div>
                    </td>
                    <td>
                        <div>{finishTime}</div>
                    </td>                    
                    <td>{session.times.length - 1}</td>                    
                </tr>
            )
        })

        const sessionTableHeader = () => {
            return (
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Activity</th>
                        <th>Total Time</th>
                        <th>Started</th>
                        <th>Finished</th>                        
                        <th>Number of Breaks</th>
                    </tr>
                </thead>
            )
        }

        return (
            <SessionLogTable>
                {sessionTableHeader()}
                <tbody>
                    {sessionRows}                    
                </tbody>
            </SessionLogTable>
        )
    }

    render() {
        console.log(this.state.sessions)
        return (
            <SessionLogContainer>
                {this.renderSessions()}
            </SessionLogContainer>
        )

    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(SessionLog)