import React, {Component} from 'react';
import {Redirect} from "react-router";
import {Helmet} from "react-helmet";
import appConfig from "../../appConfig";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from "../Layouts/header";
import Footer from "../Layouts/footer";

import {getUserComments, getUserDetails, getUserPosts} from "../../actions/user";
import SinglePostLayout from "../Layouts/singlePostLayout";
import SinglePostComment from "../Layouts/singlePostComment";

class UserProfile extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired
    };

    componentDidMount() {
        if (this.props.match.params.username === undefined) {
            return (<Redirect to={'/'}/>);
        } else {
            this.props.getUserDetails(this.props.match.params.username);
            this.props.getUserPosts(this.props.match.params.username);
            this.props.getUserComments(this.props.match.params.username);
        }
    }

    render() {
        return (
            <div>
                {this.props.user.userData.appCode === 44 ? (<Redirect to={'/'}/>) : ''}
                <Helmet>
                    <title>{appConfig.APP_NAME + ' - ' + this.props.match.params.username + "'s Profile"} </title>
                </Helmet>
                <Header/>
                <header className="masthead" style={{backgroundImage: "url('img/home-bg.jpg')"}}>
                    <div className="overlay"/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="site-heading">
                                    {this.props.user.userData.user ? (
                                        <div className={'userProfileImage'}>
                                            <img className="card-img-top"
                                                 src={this.props.user.userData.user.userProfilePicture === null ? appConfig.APP_API_URL + '/media/user_profiles/default-profile.png' : appConfig.APP_API_URL + '/media/user_profiles/' + this.props.user.userData.user.userProfilePicture}
                                                 alt={String(this.props.user.userData.user.name)}/>
                                        </div>
                                    ) : ''}
                                    <h1>{this.props.match.params.username + "'s Profile"}</h1>
                                    <span className="subheading">
                                        {this.props.user.userData.user ? (
                                            <div className={'subheading'}>
                                                {this.props.user.userData.user.userBiography === null ? 'User did not write bio' : this.props.user.userData.user.userBiography}
                                            </div>
                                        ) : ('')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <h1>User Posts</h1>
                            <hr/>
                            {this.props.user.userPosts.length > 0 ? (
                                <div className={'userProfilePosts'}>
                                    {this.props.user.userPosts.map(post =>
                                        <SinglePostLayout post={post}/>
                                    )}
                                </div>
                            ) : (<p>User did not write any post!</p>)}
                            <br/>
                            <br/>
                            <h1>User Comments</h1>
                            <hr/>
                            {this.props.user.userComments.length > 0 ? (
                                <div className={'userProfilePosts'}>
                                    {this.props.user.userComments.map(comment =>
                                        <SinglePostComment comment={comment}/>
                                    )}
                                </div>
                            ) : (<p>User did not write any post!</p>)}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {
        user
    }
};

const mapDispatchToProps = {
    getUserDetails,
    getUserPosts,
    getUserComments
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
