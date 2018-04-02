import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import Modal from 'react-responsive-modal'
import {SessionLogContainer, SessionLogTable, Info, Delete} from './styles'

import MoreInfo from './more-info'
import ActivityInfo from './activity-info'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class SessionLog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sessions: [],
            openMoreInfo: false,
            loading: true,
            showMoreInfo: false,
            showActivityInfo: false,
            activeSession: {},
            activity: '',
            activeDelete: null,
            openDeleteModal: false
        }
    }

    getSessions = userId => {
        axios.get(`/sessions/${userId}`)
        .then(res => {
            let sessions = res.data
            sessions = sessions.map(session => {
                console.log(session)
                const totalTime = session.times.reduce((acc, sessionSegment) => {
                    console.log(this.convertTime(sessionSegment.finished))
                    console.log(this.convertTime(sessionSegment.started))
                    return acc + sessionSegment.finished - sessionSegment.started
                }, 0)
                return {
                    ...session,
                    totalTime
                }
            })
            this.setState({sessions, loading: false})
        })
    }

    componentDidMount() {
        if (this.props.state.user) {
            this.getSessions(this.props.state.user._id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.user) {
            this.getSessions(nextProps.state.user._id)
        }
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

    showMoreInfo = session => {
        this.setState({showMoreInfo: true, activeSession: session})
    }

    showActivityInfo = activity => {
        this.setState({
            showActivityInfo: true,
            activity
        })
    }

    deleteSession =() => {
        axios.post(`/delete/${this.state.activeDelete}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderSessions = () => {

        const sessionRows = this.state.sessions.map(session => {
            const time = this.convertTime(session.totalTime)

            const startDate = moment.unix(session.times[0].started/1000).format("MM/DD/YYYY")
            const finishDate = moment.unix(session.times[session.times.length-1].finished/1000).format("MM/DD/YYYY")

            const startTime = moment.unix(session.times[0].started/1000).format("HH:mm A")
            const finishTime = moment.unix(session.times[session.times.length-1].finished/1000).format("HH:mm A")

            const clickable = {'fontWeight': '700', 'color': '#6b84d0', 'cursor': 'pointer'}

            return (
                <tr key={session.created_at}>
                    <td>{startDate}</td>
                    <td>
                        <span
                            onClick={() => this.showActivityInfo(session.activity)}
                            style={clickable}
                        >
                            {session.activity.charAt(0).toUpperCase() + session.activity.substr(1)}
                        </span>
                    </td>
                    <td>{time}</td>
                    <td>
                        <div>{startTime}</div>
                    </td>
                    <td>
                        <div>{finishTime}</div>
                    </td>
                    <td>{session.times.length - 1}</td>
                    <td >
                        <Info onClick={() => this.showMoreInfo(session)} >
                            Info
                        </Info>
                        <Delete onClick={() => this.setState({openDeleteModal: true, activeDelete: session._id})}>
                            Del
                        </Delete>
                    </td>
                </tr>
            )
        })

        const sessionTableHeader = () => {
            return (
                <thead>
                    <tr>
                        <th style={{width: '7rem', 'wordWrap': 'break-word'}}>Date</th>
                        <th style={{width: '20rem', 'wordWrap': 'break-word'}}>Activity</th>
                        <th style={{width: '20rem', 'wordWrap': 'break-word'}}>Total Time</th>
                        <th style={{width: '7rem', 'wordWrap': 'break-word'}}>Started</th>
                        <th style={{width: '7rem', 'wordWrap': 'break-word'}}>Finished</th>
                        <th style={{width: '7rem', 'wordWrap': 'break-word'}}>Breaks</th>
                        <th style={{width: '7rem', 'wordWrap': 'break-word'}}>More</th>
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

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={() => this.setState({openDeleteModal: false})}
            />,
            <FlatButton
              label="Delete"
              primary={true}
              onClick={this.deleteSession}
            />,
        ];
            
        

        if (this.state.loading) return null

        if (!this.props.state.user) return <h1>Sign in to see log</h1>

        if (!this.state.sessions.length) return <h1>No sessions recorded</h1>

        return (
            <SessionLogContainer>
               <Dialog
                    title="Delete this session?"
                    actions={actions}
                    modal={false}
                    open={this.state.openDeleteModal}
                    onRequestClose={() => this.setState({openDeleteModal:false})}
                >
                Deleted sessions can never be retrieved.
                </Dialog>
                <Modal open={this.state.showActivityInfo} onClose={() => this.setState({showActivityInfo: false})} >
                    <ActivityInfo activity={this.state.activity} sessions={this.state.sessions} convertTime={this.convertTime}/>
                </Modal>
                <Modal open={this.state.showMoreInfo} onClose={() => this.setState({showMoreInfo: false})} >
                    <MoreInfo session={this.state.activeSession} convertTime={this.convertTime}/>
                </Modal>
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