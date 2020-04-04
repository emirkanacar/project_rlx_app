import { combineReducers } from "redux";

import posts from './posts';
import post from "./singlePost";
import auth from "./auth";

export default combineReducers({
    posts,
    post,
    auth
});