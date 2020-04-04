import {
    FETCH_POST_FULFILLED,
    FETCH_POST_PENDING,
    FETCH_POST_REJECTED

} from "../actions/singlePost";

const initialState = {
    fetching: false,
    post: {},
    error: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POST_PENDING:
            return {
                ...state,
                fetching: true
            };
        case FETCH_POST_FULFILLED:
            return {
                ...state,
                post: action.payload,
                fetching: false
            };
        case FETCH_POST_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };
        default:
            return state;
    }
}