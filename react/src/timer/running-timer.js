import React, {Component} from 'react'
import {StopWatch} from './styles'

class RunningTimer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    tick = () => {

        if (this.state.seconds < 60) {
            this.setState({
                seconds: this.state.seconds + 1
            })
        }

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
    }

    render() {
        console.log(this.props)
        const time = this.state

        return (
            <div>
                Running
                <StopWatch>
                    <table>
                        <tbody>
                            <tr>
                                <td>{time.hours}</td>
                                <td>{time.minutes}</td>
                                <td>{time.seconds}</td>
                            </tr>
                        </tbody>
                    </table>
                </StopWatch>
            </div>
        )
    }
}

export default RunningTimer