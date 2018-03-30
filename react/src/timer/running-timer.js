import React, {Component} from 'react'
import {StopWatch, Buttons} from './styles'

class RunningTimer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            deciseconds: 0,
            seconds: 0,
            minutes: 0,
            hours: 0,
            timerPaused: false,
            breaks: 0
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    tick = () => {

        if (this.state.deciseconds < 100) {
            this.setState({
                deciseconds: this.state.deciseconds + 10
            })
        }

        if (this.state.deciseconds === 100) {
            this.setState({
                deciseconds: 0,
                seconds: this.state.seconds + 1
            }, () => {
                if (this.state.seconds === 60) {
                    this.setState({
                        seconds: 0,
                        minutes: this.state.minutes + 1
                    }, () => {
                        if (this.state.minutes === 60) {
                            this.setState({
                                minutes: 0,
                                hours: this.state.hours + 1
                            })
                        }
                    })
                }
            })
        }
    }

    pauseTimer = () => {
        clearInterval(this.interval)
        this.setState({timerPaused: true, breaks: this.state.breaks + 1})

        // Records when a break is taken for logging
        this.props.pauseTimer()
    }

    startTimer = () => {
        this.interval = setInterval(this.tick, 100);
        this.setState({timerPaused: false})

        // Records when a break is finished for logging
        this.props.startTimer()
    }

    renderPauseOrStartButton = () => {
        if (!this.state.timerPaused) {
            return <button onClick={this.pauseTimer}>Take a Break (pause timer)</button>
        } else {
            return <button onClick={this.startTimer}>Finished Break (start timer)</button>
        }
    }

    render() {
        const time = this.state

        if (this.state.breaks > 20) {
            return <StopWatch>You've taken too many breaks. This session has been recorded, please start a new session.</StopWatch>
        }

        return (
            <StopWatch>
                <div>
                    <div>
                        {time.hours}:
                        {time.minutes}:
                        {(this.state.seconds < 10 ? '0' + time.seconds : time.seconds)}:
                        {time.deciseconds/10}
                    </div>
                    <Buttons>
                        {this.renderPauseOrStartButton()}
                        <button onClick={this.props.sessionFinished}>Finish and Log Session</button>
                    </Buttons>
                </div>
            </StopWatch>
        )
    }
}

export default RunningTimer