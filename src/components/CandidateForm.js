import React, { Component } from 'react';
import { fetchPercentiles } from '../store/percentile'

import { connect } from 'react-redux';

class CandidateForm extends Component {

    constructor() {

        super();
        this.state = {
            candidateId: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        this.setState({ candidateId: ev.target.value })
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.fetchPercentiles(this.state.candidateId);
        this.setState({ candidateId: '' })
    }

    render() {
        const { candidateId } = this.state;
        const { handleChange, handleSubmit } = this;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='candidateId'>Enter your Id</label>
                    <input type='number' name='candidateId' placeholder='...' onChange={handleChange} value={candidateId} />
                    <button className='btn btn-primary'>Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchPercentiles: (candidateId) => {
            dispatch(fetchPercentiles(candidateId))
        }
    }
}

export default connect(null, mapDispatch)(CandidateForm);