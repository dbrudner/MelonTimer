import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
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

    renderSessions = () => {
        const sessionRows = this.state.sessions.map(session => {
            return (
                <tr key={session.created_at}>
                    <td>{session.activity}</td>
                    <td>{session.totalTime}</td>
                    <td>{session.times.length - 1}</td>                    
                </tr>
            )
        })

        const sessionTableHeader = () => {
            return (
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Total Time</th>
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