import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Moment from 'react-moment';
import slugify from "slugify";
import {Helmet} from "react-helmet";
import appConfig from "../../appConfig";
import SinglePostComment from './singlePostComment';

import {fetchAuthorDetails, fetchComments, savePostComment} from '../../actions/singlePost';
import {checkAuth} from "../../actions/auth";

class singlePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentArea: '',
            error: {
                commentArea: ''
            },
            newComments: []
        }
    }

    handleChange = event => {
        event.preventDefault();
        const {name, value} = event.target;
        let error = this.state.error;

        switch (name) {
            case 'commentArea':
                error.commentArea = value.length < 5 ? 'Comment must 5 be characters long' : '';
                break;
            default:
                break;
        }

        this.setState({
            [name]: value,
            error
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const postData = {
            commentContent: this.state.commentArea,
            commentSenderUsername: this.props.auth.user.username,
            commentTargetPostID: this.props.post.post._id
        };
        const token = localStorage.getItem('auth_token');
        this.props.savePostComment(postData, token);
    };

    static propTypes = {
        auth: PropTypes.object
    };

    componentDidMount() {
        if (localStorage.getItem('auth_token')) {
            this.props.checkAuth(localStorage.getItem('auth_token'));
        }
    }

    render() {
        const emptyMsg = (
            <p> no post</p>
        );

        const postList = (
            <div>
                {
                    this.props.post.error.response ? (<Redirect to={'/'}/>) : (
                        this.props.post.post ? (
                            <div>
                                <Helmet>
                                    <title>{appConfig.APP_NAME + ' - ' + this.props.post.post.postName} </title>
                                </Helmet>
                                <header className="masthead" style={ this.props.post.post.uploadedContents === null ? {} : { backgroundImage: 'url(img/post-bg.jpg)' } }>
                                    <div className="overlay" />
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-8 col-md-10 mx-auto">
                                                <div className="post-heading">
                                                    <h1>{this.props.post.post.postName}</h1>
                                                    <h2 className="subheading">{ this.props.post.post.postDesc }</h2>
                                                    <span className="meta">Posted by
                                                <Link target={'_blank'} to={'/author/' + slugify(String(this.props.post.post.postAuthor), { replacement: '-', lower: true }) }> { this.props.post.post.postAuthorName } </Link>
                                                <Moment toNow>{ this.props.post.post.createdAt }</Moment></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </header>
                                <article>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-8 col-md-10 mx-auto">
                                                { this.props.post.post.postContent }
                                            </div>
                                        </div>
                                    </div>
                                </article>
                                { this.props.post.postAuthor.user === undefined ? 'loading' : (
                                    <div className={'authorDetails container'}>
                                        <div className={'row'}>
                                            <div className={'col-lg-8 col-md-10 mx-auto'}>
                                                <div className="card">
                                                    <img className="card-img-top" src={this.props.post.postAuthor.user.userProfilePicture === null ? appConfig.APP_API_URL + '/media/user_profiles/default-profile.png': appConfig.APP_API_URL + '/media/user_profiles/' + this.props.post.postAuthor.user.userProfilePicture} alt={this.props.post.postAuthor.user.name} />
                                                    <div className="card-body">
                                                        <h5 className="card-title"><Link target={'_blank'} to={'/user/' + slugify(String(this.props.post.post.postAuthor), { replacement: '-', lower: true }) }> { this.props.post.post.postAuthor } </Link></h5>
                                                        <p className="card-text">{this.props.post.postAuthor.user.userBiography == null ? 'User has not writed bio': this.props.post.postAuthor.user.userBiography }</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) }
                                <hr />
                                <br />
                                <div className={'postComments container'}>
                                    <div className={'row'}>
                                        <div className={'col-lg-8 col-md-10 mx-auto'}>
                                            <h3>Comments</h3>
                                            {this.props.auth.isAuth ? (
                                                <div className={"newComment"}>
                                                    <div className={'validationErrors'}>
                                                        {this.state.error.commentArea.length > 0 ? (
                                                            <div className="alert alert-danger" role="alert">
                                                                {this.state.error.commentArea}
                                                            </div>
                                                        ) : ''}
                                                    </div>
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="commentTextarea">Enter your comment</label>
                                                            <textarea style={{resize: "none"}} className="form-control"
                                                                      name={'commentArea'} id="commentTextarea" rows="3"
                                                                      value={this.state.commentArea}
                                                                      onChange={this.handleChange} required/>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Submit
                                                        </button>
                                                    </form>
                                                    <hr/>
                                                </div>
                                            ) : ''}
                                            {this.props.post.newComment.appCode === 21 ? window.location.reload() : ''}
                                            {this.props.post.errorComment.response ? (
                                                <div className="alert alert-danger" role="alert">
                                                    {this.props.post.errorComment.response.data.message}
                                                </div>
                                            ) : ('')}
                                            {this.props.post.postComments !== undefined ? (
                                                <div>
                                                    {this.props.post.postComments.map(comment =>
                                                        <SinglePostComment comment={comment}/>
                                                    )}
                                                </div>
                                            ) : ('Comment not found') }
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ) : ( <Redirect to={'/'} /> )
                    )

                }
            </div>
        );

        return (
            <div>
                { this.props.post.length === 0 ? emptyMsg : postList }
            </div>
        );
    }
}

singlePost.propTypes = {
    post: PropTypes.shape({
        post: PropTypes.object.isRequired,
    }).isRequired
};

const mapStateToProps = ({postAuthor, postComments, auth, savePostComment}) => {
    return {
        postAuthor,
        postComments,
        auth
    }
};

const mapDispatchToProps = {
    fetchAuthorDetails,
    fetchComments,
    checkAuth,
    savePostComment
};

export default connect(mapStateToProps, mapDispatchToProps)(singlePost);
