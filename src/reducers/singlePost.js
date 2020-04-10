import {
    FETCH_AUTHOR_DETAILS_FULFILLED,
    FETCH_AUTHOR_DETAILS_PENDING,
    FETCH_AUTHOR_DETAILS_REJECTED,
    FETCH_COMMENTS_FULFILLED,
    FETCH_COMMENTS_PENDING,
    FETCH_COMMENTS_REJECTED,
    FETCH_POST_FULFILLED,
    FETCH_POST_PENDING,
    FETCH_POST_REJECTED,
    SAVE_POST_COMMENT_FULFILLED,
    SAVE_POST_COMMENT_PENDING,
    SAVE_POST_COMMENT_REJECTED
} from "../actions/singlePost";

const initialState = {
    fetching: false,
    authorFetching: false,
    commentsFetching: false,
    newCommentSaving: false,
    post: {},
    postAuthor: {},
    postComments: [],
    newComment: {},
    error: {},
    errorAuthor: {},
    errorComment: {},
    newCommentError: {}
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

        case SAVE_POST_COMMENT_PENDING:
            return {
                ...state,
                newCommentSaving: true
            };
        case SAVE_POST_COMMENT_FULFILLED:
            return {
                ...state,
                newComment: action.payload,
                newCommentSaving: false
            };
        case SAVE_POST_COMMENT_REJECTED:
            return {
                ...state,
                newCommentError: action.payload,
                newCommentSaving: false
            };

        default:
            return state;
    }
}