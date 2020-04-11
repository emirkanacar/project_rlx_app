import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Moment from 'react-moment';
import slugify from "slugify";

class SinglePostLayout extends Component {
    render() {
        return (
            <div className="post-preview" key={this.props.post._id}>
                <Link target={'_blank'} to={'/post/' + slugify(String(this.props.post.postName), {
                    replacement: '-',
                    lower: true
                }) + '_' + this.props.post._id}>
                    <h3 className="post-title">
                        {this.props.post.postName}
                    </h3>
                    <h4 className="post-subtitle">
                        {String(this.props.post.postContent).substr(0, 45) + '...'}
                    </h4>
                </Link>
                <p className="post-meta">Posted by
                    <Link target={'_blank'} to={'/user/' + slugify(String(this.props.post.postAuthor), {
                        replacement: '-',
                        lower: true
                    })}> {this.props.post.postAuthorName} </Link>
                    <Moment toNow>{this.props.post.createdAt}</Moment></p>
            </div>
        );
    }
}

SinglePostLayout.propTypes = {
    post: PropTypes.object.isRequired
};

export default SinglePostLayout;