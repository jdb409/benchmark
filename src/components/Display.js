import React from 'react';

const Display = (props) => {
const {percentile} = props;
    return (
        <div className='container'>
        <h3>Here is how you rank amongst other {percentile.candidate.title}'s</h3>
        <br/>
        <div className='row'>
            <div className="card col-sm-6">
                <div className="card-block">
                    <h4 className="card-title">Coding Percentile</h4>
                    <h6 className="card-text">{percentile.codingPercentile}th percentile</h6>
                </div>
            </div>

            <div className="card col-sm-6">
                <div className="card-block">
                    <h4 className="card-title">Communication Percentile</h4>
                    <h6 className="card-text">{percentile.communicationPercentile}th percentile</h6>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Display;

