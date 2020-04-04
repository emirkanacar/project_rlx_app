import {
    USER_LOGIN_FULFILLED,
    USER_LOGIN_PENDING,
    USER_LOGIN_REJECTED,

    USER_REGISTER_FULFILLED,
    USER_REGISTER_PENDING,
    USER_REGISTER_REJECTED,

    USER_CHECK_FULFILLED,
    USER_CHECK_PENDING,
    USER_CHECK_REJECTED
} from "../actions/auth";

const initialState = {
    fetching: true,
    isAuth: false,
    user: {},
    error: {},
};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGIN_PENDING:
            return {
                ...state,
                isAuth: false
            };
        case USER_LOGIN_FULFILLED:
            return {
                ...state,
                isAuth: true,
                user: action.payload
            };
        case USER_LOGIN_REJECTED:
            return {
                ...state,
                error: action.payload
            };

        case USER_REGISTER_PENDING:
            return {
                ...state,
                isAuth: false
            };
        case USER_REGISTER_FULFILLED:
            return {
                ...state,
                isAuth: true,
                user: action.payload
            };
        case USER_REGISTER_REJECTED:
            return {
                ...state,
                error: action.payload
            };

        case USER_CHECK_PENDING:
            return {
                ...state,
                fetching: true,
                isAuth: false
            };
        case USER_CHECK_FULFILLED:
            return {
                ...state,
                isAuth: true,
                fetching: false,
                user: action.payload
            };
        case USER_CHECK_REJECTED:
            return {
                ...state,
                fetching: false,
                error: action.payload
            };

        default:
            return state;
    }
}