import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { GridLoader } from "react-spinners";
import Moment from 'react-moment';
import slugify from "slugify";

class PostList extends Component {
    render() {
        const emptyMsg = (
            <p> no post</p>
        );

        const postList = (
            <div>
                <GridLoader
                    size={25}
                    color={'#000'}
                    loading={this.props.posts.fetching}
                />
                {
                    this.props.posts.error.response ? <h3>API Error</h3> :
                        this.props.posts.postList.map( post =>
                            <div className="post-preview" key={post._id}>
                                <Link target={'_blank'} to={'/post/' + slugify(post.postName, { replacement: '-', lower: true }) + '_' + post._id }>
                                    <h2 className="post-title">
                                        { post.postName }
                                    </h2>
                                    <h3 className="post-subtitle">
                                        { post.postContent.substr(0,45) + '...' }
                                    </h3>
                                </Link>
                                <p className="post-meta">Posted by
                                    <Link target={'_blank'} to={'/user/' + slugify(post.postAuthor, { replacement: '-', lower: true }) }> { post.postAuthorName } </Link>
                                    <Moment toNow>{ post.createdAt }</Moment></p>
                            </div>
                        )
                }
            </div>
        );

        return (
            <div>
                { this.props.posts.length === 0 ? emptyMsg : postList }
            </div>
        );
    }
};

PostList.propTypes = {
  posts: PropTypes.shape({
      postList: PropTypes.array.isRequired,
  }).isRequired
};

export default PostList;