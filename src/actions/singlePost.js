import axios from 'axios';
import appConfig from "../appConfig";

export const FETCH_POST_PENDING = 'FETCH_POST_PENDING';
export const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED';
export const FETCH_POST_REJECTED = 'FETCH_POST_REJECTED';

export const FETCH_AUTHOR_DETAILS_PENDING = 'FETCH_AUTHOR_DETAILS_PENDING';
export const FETCH_AUTHOR_DETAILS_FULFILLED = 'FETCH_AUTHOR_DETAILS_FULFILLED';
export const FETCH_AUTHOR_DETAILS_REJECTED = 'FETCH_AUTHOR_DETAILS_REJECTED';

export const FETCH_COMMENTS_PENDING = 'FETCH_COMMENTS_PENDING';
export const FETCH_COMMENTS_FULFILLED = 'FETCH_COMMENTS_FULFILLED';
export const FETCH_COMMENTS_REJECTED = 'FETCH_COMMENTS_REJECTED';

export function fetchSinglePost(id) {
    return dispatch => {
        dispatch({
            type: 'FETCH_POST',
            payload: axios.get(appConfig.APP_API_URL +'/post/getById/' + id)
                .then(res => {
                    dispatch(fetchAuthorDetails(res.data.postAuthor));
                    dispatch(fetchComments(res.data._id));
                    return res.data;
                })
        })
    }
}

export function fetchAuthorDetails(username) {
    return dispatch => {
        dispatch({
            type: 'FETCH_AUTHOR_DETAILS',
            payload: axios.get(appConfig.APP_API_URL + '/user/' + username)
                .then(res => res.data)
        })
    }
}

export function fetchComments(postID) {
    return dispatch => {
        dispatch({
            type: 'FETCH_COMMENTS',
            payload: axios.get(appConfig.APP_API_URL + '/comment/list/' + postID)
                .then(res => res.data)
        });
    }
}