import {
    FETCH_USER_COMMENTS_FULFILLED,
    FETCH_USER_COMMENTS_PENDING,
    FETCH_USER_COMMENTS_REJECTED,
    FETCH_USER_FULFILLED,
    FETCH_USER_PENDING,
    FETCH_USER_POSTS_FULFILLED,
    FETCH_USER_POSTS_PENDING,
    FETCH_USER_POSTS_REJECTED,
    FETCH_USER_REJECTED,
} from "../actions/user";

const initialState = {
    fetching: false,
    fetchingPosts: false,
    fetchingComments: false,
    userData: {},
    userPosts: [],
    userComments: [],
    errors: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_PENDING:
            return {
                ...state,
                fetching: true
            };

        case FETCH_USER_FULFILLED:
            return {
                ...state,
                fetching: false,
                userData: action.payload
            };

        case FETCH_USER_REJECTED:
            return {
                ...state,
                fetching: false,
                errors: {
                    ...action.payload
                }
            };

        case FETCH_USER_POSTS_PENDING:
            return {
                ...state,
                fetchingPosts: true
            };

        case FETCH_USER_POSTS_FULFILLED:
            return {
                ...state,
                fetchingPosts: false,
                userPosts: action.payload
            };

        case FETCH_USER_POSTS_REJECTED:
            return {
                ...state,
                fetchingPosts: false,
                errors: {
                    ...action.payload
                }
            };

        case FETCH_USER_COMMENTS_PENDING:
            return {
                ...state,
                fetchingComments: true
            };

        case FETCH_USER_COMMENTS_FULFILLED:
            return {
                ...state,
                fetchingComments: false,
                userComments: action.payload
            };

        case FETCH_USER_COMMENTS_REJECTED:
            return {
                ...state,
                fetchingComments: false,
                errors: {
                    ...action.payload
                }
            };

        default:
            return state
    }
}