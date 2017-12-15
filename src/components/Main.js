import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CandidateForm from './CandidateForm';

class Main extends Component {
    render() {
        return (
            <div>
                <CandidateForm />
            </div>
        )
    }
}

export default connect(null, null)(Main);