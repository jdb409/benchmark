import axios from 'axios';

//Action Type
const GET_PERCENTILES = 'GET_PERCENTILES';
const ERROR = 'ERROR';

//Action Creator

const getPercentiles = (percentiles) => {
    return {
        type: GET_PERCENTILES,
        percentiles
    }
};

const error = (err) => {
    return {
        type: ERROR,
        err
    }
};

//Thunk

export const fetchPercentiles = (candidateId) => {
    return (dispatch) => {
        axios.get(`/api/candidate/${candidateId}`)
            .then(res => res.data)
            .then(percentiles => {
                if (percentiles.err) {
                    return dispatch(error(percentiles.err));
                }
                dispatch(getPercentiles(percentiles))
            })
    }
}

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PERCENTILES:
            return Object.assign({}, state, action.percentiles);
        case ERROR:
            return { err: action.err }
        default:
            return state;
    }
}