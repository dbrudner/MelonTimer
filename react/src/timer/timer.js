import React, {Component} from 'react'
import {connect} from 'react-redux'
import NotSignedIn from './not-signed-in'
import {TimerContainer, StartTimer} from './styles'
import axios from 'axios'
import RunningTimer from './running-timer'

class Timer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activity: '',
            activities: [],
            timerStarted: false,
            timeStarted: null,
            timeFinished: null
        }
    }

    componentDidMount() {
        axios.get('/activities')
        .then(response => {
            const activities = response.data.reduce((acc, activity) => {
                return [...acc, activity.activity]
            }, [])
            this.setState({activities})
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
                <input list={key} value={this.state[key]} onChange={event => this.setState({activity: event.target.value})} />
                <datalist id={key}>
                    {renderOptions(options)}
                </datalist>
            </div>
        )
    }

    startRunningTimer= () => {
        console.log('started')
        this.setState({
            timerStarted: true,
            timeStarted: Date.now()
        })
    }

    render() {
        console.log(this.state)
        // If user isn't signed in, inform them to sign in or register
        if (!this.props.state.user) return <NotSignedIn/>

        // If timer is started, start a timer and return this component instead
        if (this.state.timerStarted) {
            return <RunningTimer props={this.state} />
        }

        return (
            <TimerContainer>
                <h1>Timer</h1>
                <div>
                    {this.renderDatalist('What are you going to do?', this.state.activity, this.state.activities)}
                    <div>
                    <StartTimer onClick={this.startRunningTimer}>
                        Start Timer
                    </StartTimer>
                    </div>
                </div>
            </TimerContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}


export default connect(mapStateToProps)(Timer)