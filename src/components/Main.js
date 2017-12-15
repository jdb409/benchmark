import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Main extends Component {
    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}

export default connect(null, null)(Main);