import axios from 'axios';
import appConfig from "../appConfig";

export const FETCH_POST_PENDING = 'FETCH_POST_PENDING';
export const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED';
export const FETCH_POST_REJECTED = 'FETCH_POST_REJECTED';

export function fetchSinglePost(id) {
    return dispatch => {
        dispatch({
            type: 'FETCH_POST',
            payload: axios.get(appConfig.APP_API_URL +'/post/getById/' + id)
                .then(res => res.data)
        })
    }
}