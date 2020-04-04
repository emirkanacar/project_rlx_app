import axios from 'axios';

export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
export const FETCH_POSTS_FULFILLED = 'FETCH_POSTS_FULFILLED';
export const FETCH_POSTS_REJECTED = 'FETCH_POSTS_REJECTED';

export function fetchPosts() {
    return dispatch => {
        dispatch({
            type: "FETCH_POSTS",
            payload: axios.get('http://localhost:2200/post/list')
                .then(res => res.data)
        })
    }
}