import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPercentiles } from '../store/percentile'

import Display from './Display';

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
        const { percentile } = this.props;
        const { handleChange, handleSubmit } = this;

        return (
            <div className='container'>
                <br />
                <h1>Enter your ID to view your performance</h1>
                <form onSubmit={handleSubmit}>
                    <input className='form-control' type='number' name='candidateId' placeholder='...' onChange={handleChange} value={candidateId} />
                    <br />
                    <button className='btn btn-primary btn-lg' disabled={candidateId.length === 0 ? true : null} >Submit</button>
                </form>
                {percentile.err && !percentile.codingPercentile ?
                    <h1 className='alert alert-warning'>{percentile.err}</h1>
                    :
                    null
                }
                {percentile && percentile.codingPercentile ?
                    <Display percentile={percentile} />
                    :
                    null
                }
            </div>
        )
    }
}

const mapState = ({ percentile }) => {
    return {
        percentile
    }
};

const mapDispatch = (dispatch) => {
    return {
        fetchPercentiles: (candidateId) => {
            dispatch(fetchPercentiles(candidateId))
        }
    }
}

export default connect(mapState, mapDispatch)(CandidateForm);