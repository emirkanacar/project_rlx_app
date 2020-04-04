import axios from 'axios';

export const USER_REGISTER_PENDING = 'USER_REGISTER_PENDING';
export const USER_REGISTER_FULFILLED = 'USER_REGISTER_FULFILLED';
export const USER_REGISTER_REJECTED = 'USER_REGISTER_REJECTED';

export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING';
export const USER_LOGIN_FULFILLED = 'USER_LOGIN_FULFILLED';
export const USER_LOGIN_REJECTED = 'USER_LOGIN_REJECTED';

export const USER_CHECK_PENDING = 'USER_CHECK_PENDING';
export const USER_CHECK_FULFILLED = 'USER_CHECK_FULFILLED';
export const USER_CHECK_REJECTED = 'USER_CHECK_REJECTED';

export function loginUser(user) {
    return dispatch => {
        dispatch({
            type: 'USER_LOGIN',
            payload: axios.post('http://localhost:2200/user/login', user, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', }})
                .then((res) => {
                    localStorage.setItem('auth_token', res.data.token);
                    return res.data;
                })
        })
    }
}

export function registerUser(user) {
    return dispatch => {
        dispatch({
            type: 'USER_REGISTER',
            payload: axios.post('http://localhost:2200/user/create', user, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', }})
                .then((res) => {
                    if(res.data.appCode === 21)
                    {
                        window.location = '/auth/login';
                    }

                    return res.data
                })
        })
    }
}

export function checkAuth(token) {
    return dispatch => {
        dispatch({
            type: 'USER_CHECK',
            payload: axios.get('http://localhost:2200/user/me', { headers: { 'Authorization': 'Bearer ' + token } })
                .then(res => res.data.user)
        })
    }
}