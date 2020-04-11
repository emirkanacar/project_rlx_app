import axios from 'axios';
import appConfig from '../appConfig';

export const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';

export const FETCH_USER_POSTS_PENDING = 'FETCH_USER_POSTS_PENDING';
export const FETCH_USER_POSTS_FULFILLED = 'FETCH_USER_POSTS_FULFILLED';
export const FETCH_USER_POSTS_REJECTED = 'FETCH_USER_POSTS_REJECTED';

export const FETCH_USER_COMMENTS_PENDING = 'FETCH_USER_COMMENTS_PENDING';
export const FETCH_USER_COMMENTS_FULFILLED = 'FETCH_USER_COMMENTS_FULFILLED';
export const FETCH_USER_COMMENTS_REJECTED = 'FETCH_USER_COMMENTS_REJECTED';

export function getUserDetails(username) {
    return dispatch => {
        dispatch({
            type: 'FETCH_USER',
            payload: axios.get(appConfig.APP_API_URL + '/user/' + username)
                .then(res => res.data)
        })
    }
}

export function getUserPosts(username) {
    return dispatch => {
        dispatch({
            type: 'FETCH_USER_POSTS',
            payload: axios.get(appConfig.APP_API_URL + '/post/getByAuthor/' + username)
                .then(res => res.data)
        })
    }
}

export function getUserComments(username) {
    return dispatch => {
        dispatch({
            type: 'FETCH_USER_COMMENTS',
            payload: axios.get(appConfig.APP_API_URL + '/comment/getByAuthor/' + username)
                .then(res => res.data)
        })
    }
}