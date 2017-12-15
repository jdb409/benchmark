import axios from 'axios';

//Action Type

const GET_PERCENTILES = 'GET_PERCENTILES';

//Action Creator

const getPercentiles = (percentiles) => {
    return {
        type: GET_PERCENTILES, 
        percentiles
    }
};

//Thunk

export const fetchPercentiles = (candidateId) => {
    return (dispatch) => {
        axios.get(`/api/candidate/${candidateId}`)
        .then(res => res.data)
        .then(percentiles => {
            dispatch(getPercentiles(percentiles))
        })
    }
}

export default function (state = {}, action){
    switch(action.type) {
        case GET_PERCENTILES: 
            return Object.assign({}, state, action.percentiles);
        default:
            return state;
    }
}