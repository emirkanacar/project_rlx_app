import {
    FETCH_POST_FULFILLED,
    FETCH_POST_PENDING,
    FETCH_POST_REJECTED,

    FETCH_AUTHOR_DETAILS_FULFILLED,
    FETCH_AUTHOR_DETAILS_PENDING,
    FETCH_AUTHOR_DETAILS_REJECTED,

    FETCH_COMMENTS_FULFILLED,
    FETCH_COMMENTS_PENDING,
    FETCH_COMMENTS_REJECTED

} from "../actions/singlePost";

const initialState = {
    fetching: false,
    authorFetching: false,
    commentsFetching: false,
    post: {},
    postAuthor: {},
    postComments: [],
    error: {},
    errorAuthor: {},
    errorComment: {}
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
        case FETCH_AUTHOR_DETAILS_PENDING:
            return {
                ...state,
                authorFetching: true
            };
        case FETCH_AUTHOR_DETAILS_FULFILLED:
            return {
                ...state,
                postAuthor: action.payload,
                authorFetching: false
            };
        case FETCH_AUTHOR_DETAILS_REJECTED:
            return {
                ...state,
                errorAuthor: action.payload,
                authorFetching: false
            };

        case FETCH_COMMENTS_PENDING:
            return {
                ...state,
                commentsFetching: true
            };
        case FETCH_COMMENTS_FULFILLED:
            return {
                ...state,
                postComments: action.payload,
                commentsFetching: false
            };
        case FETCH_COMMENTS_REJECTED:
            return {
                ...state,
                errorComment: action.payload,
                commentsFetching: false
            };

        default:
            return state;
    }
}