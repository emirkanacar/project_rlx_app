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

export const SAVE_POST_COMMENT_PENDING = 'SAVE_POST_COMMENT_PENDING';
export const SAVE_POST_COMMENT_FULFILLED = 'SAVE_POST_COMMENT_FULFILLED';
export const SAVE_POST_COMMENT_REJECTED = 'SAVE_POST_COMMENT_REJECTED';

export function fetchSinglePost(id) {
    return dispatch => {
        dispatch({
            type: 'FETCH_POST',
            payload: axios.get(appConfig.APP_API_URL + '/post/getById/' + id)
                .then(res => {
                    dispatch(fetchAuthorDetails(res.data.postAuthor));
                    dispatch(fetchComments(res.data._id, 1));
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

export function fetchComments(postID, page = 1) {
    return dispatch => {
        dispatch({
            type: 'FETCH_COMMENTS',
            payload: axios.get(appConfig.APP_API_URL + '/comment/list/' + postID, {params: {page: page}})
                .then(res => res.data)

        });
    }
}

export function savePostComment(postData, token) {
    return dispatch => {
        dispatch({
            type: 'SAVE_POST_COMMENT',
            payload: axios.post(appConfig.APP_API_URL + '/comment/create', postData, {headers: {'Authorization': 'Bearer ' + token}})
                .then(res => res.data)
        })
    }
}