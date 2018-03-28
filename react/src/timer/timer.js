import React, {Component} from 'react'
import {connect} from 'react-redux'
import NotSignedIn from './not-signed-in'
import {TimerContainer} from './styles'
import axios from 'axios'


class Timer extends Component {

    constructor(props) {
        super(props)
        this.state = {activity: ''}
    }

    componentDidMount() {
        axios.get('/activities')
        .then(activities => {
            console.log(activities)
            this.setState({activities})
        })
    }

    render() {

        if (!this.props.state.user) return <NotSignedIn/>

        return (
            <TimerContainer>
                <h1>Timer</h1>
                <div>
                    <input type='text' value={this.state.activity} onChange={e => this.setState({activity: e.target.value})} />
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