import React, {Component} from 'react';
import PropTypes from 'prop-types';
import appConfig from "../../appConfig";
import {Link} from "react-router-dom";
import Moment from 'react-moment';
import slugify from "slugify";

class SinglePostComment extends Component {
    render() {
        return (
            <div>
                { this.props.comment.map(comment =>
                    <div className="card commentCard" key={comment._id}>
                        <img className="card-img-top" src={comment.commentSenderUser.profilePicture === null ? appConfig.APP_API_URL + '/media/user_profiles/default-profile.png': appConfig.APP_API_URL + '/media/user_profiles/' + comment.commentSenderUser.profilePicture} />
                        <div className="card-body">
                            <h5 className="card-title"><Link target={'_blank'} to={'/user/' + slugify(String(comment.commentSenderUser.username), { replacement: '-', lower: true }) }>{comment.commentSenderUser.name}</Link> </h5>
                            <p className="card-text">{ comment.commentContent }</p>
                            <span className={'time text-muted'}>added <Moment toNow>{ comment.commentCreatedAt }</Moment></span>
                        </div>
                    </div>
                ) }
            </div>
        );
    }
}

SinglePostComment.propTypes = {
    comment: PropTypes.array.isRequired
};

export default SinglePostComment;