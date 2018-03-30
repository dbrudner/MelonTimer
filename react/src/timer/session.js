import React, {Component} from 'react'
import {connect} from 'react-redux'
import NotSignedIn from './not-signed-in'
import {TimerContainer, StartTimer, SessionContainer} from './styles'
import axios from 'axios'
import RunningTimer from './running-timer'

class Session extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activity: '',
            activities: [],
            sessionStarted: false,
            sessionFinished: false,
            times: [],
            currentSession: {
                started: null,
                finished: null
            }
        }
    }

    componentDidMount() {
        axios.get('/activities')
        .then(response => {
            this.setState({activities: response.data})
        })
    }

    renderDatalist = (label, key, options) => {

        const renderOptions = options => {
            return options.map(option => {
                return <option value={option} key={option}/>
            })
        }

        return (
            <div>
                <div>
                    {label}
                </div>
                <input list={key} value={this.state[key]} onChange={event => this.setState({activity: event.target.value.toLowerCase()})} />
                <datalist id={key}>
                    {renderOptions(options)}
                </datalist>
            </div>
        )
    }

    startRunningTimer= event => {
        event.preventDefault();
        this.setState({
            sessionStarted: true,
            currentSession: {
                started: Date.now(),
                finished: null
            }
        })
    }

    // Pause timer for break
    pauseTimer = () => {

        // Adds current session segment to session
        this.setState({
            currentSession: {...this.state.currentSession, finished: Date.now()}
        }, () => {
            this.setState({
                times: [...this.state.times, this.state.currentSession]
            })
        })
    }

    // Starts timer when break is finished
    // Starts a new session segment
    startTimer = () => {
        this.setState({
            currentSession: {
                started: Date.now(),
                finished: null
            }
        })
    }

    sessionFinished = () => {
        // Add final session segment
        this.setState({
            sessionFinished: true,
            currentSession: {...this.state.currentSession, finished: Date.now()}
        }, () => {
            this.setState({
                times: [...this.state.times, this.state.currentSession]
            }, () => {

                const userId = this.props.state.user._id
                // Prepare object for post
                const session = {
                    activity: this.state.activity,
                    times: this.state.times,
                    userId
                }
                // Post new session
                axios.post('/new/session', session)
                .then(res => {
                    console.log(res)
                })
            })
        })
    }

    render() {
        // If user isn't signed in, inform them to sign in or register
        if (!this.props.state.user) return <NotSignedIn/>

        // If session is finished, make request and show results
        if (this.state.sessionFinished) {
            return <div>Finished</div>
        }

        // If timer is started, start a timer and return this component instead
        if (this.state.sessionStarted) {
            return <RunningTimer activity={this.state.activity} sessionFinished={this.sessionFinished} pauseTimer={this.pauseTimer} startTimer={this.startTimer} />
        }

        return (
            <SessionContainer>
                <div>
                    <h2>Start a Session</h2>
                    <form onSubmit={this.startRunningTimer}>
                        {this.renderDatalist('What are you going to do?', this.state.activity, this.state.activities)}
                        <div>
                            <StartTimer>
                                Start Session
                            </StartTimer>
                        </div>
                    </form>
                </div>
            </SessionContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}


export default connect(mapStateToProps)(Session)