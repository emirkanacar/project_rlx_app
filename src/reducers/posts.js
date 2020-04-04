import {
    FETCH_POSTS_FULFILLED,
    FETCH_POSTS_PENDING,
    FETCH_POSTS_REJECTED,

} from "../actions/posts";

const initialState = {
    fetching: false,
    postList: [],
    error: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS_PENDING:
            return {
                ...state,
                fetching: true
            };
        case FETCH_POSTS_FULFILLED:
            return {
                ...state,
                postList: action.payload,
                fetching: false
            };
        case FETCH_POSTS_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };
        default:
            return state;
    }
}