import React, {Component} from 'react'
import {connect} from 'react-redux'
import NotSignedIn from './not-signed-in'
import {TimerContainer} from './styles'
import axios from 'axios'


class Timer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activity: '',
            activities: []
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

    render() {

        if (!this.props.state.user) return <NotSignedIn/>

        return (
            <TimerContainer>
                <h1>Timer</h1>
                <div>
                    {this.renderDatalist('What are you going to do?', this.state.activity, this.state.activities)}
                    <div>
                    <button>
                        Start Timer
                    </button>
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