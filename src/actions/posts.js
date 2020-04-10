import axios from 'axios';
import appConfig from "../appConfig";

export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
export const FETCH_POSTS_FULFILLED = 'FETCH_POSTS_FULFILLED';
export const FETCH_POSTS_REJECTED = 'FETCH_POSTS_REJECTED';

export function fetchPosts(page = 1) {
    return dispatch => {
        dispatch({
            type: "FETCH_POSTS",
            payload: axios.get(appConfig.APP_API_URL + '/post/list', {params: {page: page}})
                .then(res => res.data)
        })
    }
}