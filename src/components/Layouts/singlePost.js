import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import slugify from "slugify";

const singlePost = ({ post }) => {
    const emptyMsg = (
        <p> no post</p>
    );

    const postList = (
        <div>
            {
                post.error.response ? <h3>API Error</h3> :
                    <div>
                        <header className="masthead" style={ post.post.uploadedContents === null ? {} : { backgroundImage: 'url(img/post-bg.jpg)' } }>
                            <div className="overlay" />
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 col-md-10 mx-auto">
                                        <div className="post-heading">
                                            <h1>{post.post.postName}</h1>
                                            <h2 className="subheading">Problems look mighty small from 150 miles up</h2>
                                            <span className="meta">Posted by
                                                <Link target={'_blank'} to={'/author/' + slugify(String(post.post.postAuthor), { replacement: '-', lower: true }) }> { post.post.postAuthor } </Link>
                                                <Moment toNow>{ post.post.createdAt }</Moment></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <article>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 col-md-10 mx-auto">
                                        { post.post.postContent }
                                    </div>
                                </div>
                            </div>
                        </article>
                        <hr/>
                    </div>

            }
        </div>
    );

    return (
        <div>
            { post.length === 0 ? emptyMsg : postList }
        </div>
    );
};

singlePost.propTypes = {
    post: PropTypes.shape({
        post: PropTypes.object.isRequired,
    }).isRequired
};

export default singlePost;