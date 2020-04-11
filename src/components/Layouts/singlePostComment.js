import React, {Component} from 'react';
import PropTypes from 'prop-types';
import appConfig from "../../appConfig";
import {Link} from "react-router-dom";
import Moment from 'react-moment';
import slugify from "slugify";

class SinglePostComment extends Component {
    render() {
        return (
            <div className="card commentCard" key={this.props.comment._id}>
                <img className="card-img-top"
                     src={this.props.comment.commentSenderUser.profilePicture === null ? appConfig.APP_API_URL + '/media/user_profiles/default-profile.png' : appConfig.APP_API_URL + '/media/user_profiles/' + this.props.comment.commentSenderUser.profilePicture}
                     alt={String(this.props.comment.commentSenderUser.username)}/>
                <div className="card-body">
                    <h5 className="card-title"><Link target={'_blank'}
                                                     to={'/user/' + slugify(String(this.props.comment.commentSenderUser.username), {
                                                         replacement: '-',
                                                         lower: true
                                                     })}>{this.props.comment.commentSenderUser.name}</Link></h5>
                    <p className="card-text">{this.props.comment.commentContent}</p>
                    <span className={'time text-muted'}>added <Moment
                        toNow>{this.props.comment.commentCreatedAt}</Moment></span>
                </div>
            </div>
        );
    }
}

SinglePostComment.propTypes = {
    comment: PropTypes.object.isRequired
};

export default SinglePostComment;