import React, { Component } from 'react'
import Modal from 'react-responsive-modal'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { openSignUp } from '../actions/index';

import Form from './form'

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false }, () => {
            setTimeout(() => this.props.openSignUp(false), 300)
        });
    };

    render() {
        const { open } = this.state;
        return (
            <div>
                <Modal open={open} onClose={this.onCloseModal} little>
                    <Form closeModal={this.onCloseModal}/>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({openSignUp: openSignUp}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)