import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import appConfig from "../../appConfig";

import {
    fetchPosts
} from "../../actions/posts";

import PostList from '../Layouts/postList';
import Header from "../Layouts/header";
import Footer from "../Layouts/footer";

import '../../assets/App.css';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

class Home extends Component {

    static propTypes = {
        posts: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>{appConfig.APP_NAME + ' - Home'} </title>
                </Helmet>
                <Header />
                <header className="masthead" style={{ backgroundImage: "url('img/home-bg.jpg')" }}>
                    <div className="overlay"/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="site-heading">
                                    <h1>{ appConfig.APP_NAME }</h1>
                                    <span className="subheading">{ appConfig.APP_DESC }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <PostList posts={this.props.posts} />
                            { this.props.posts.postList.length === 0 ? (<p>No post</p>) : (
                                <div className="clearfix">
                                    <Link className="btn btn-primary float-right" to={'/#'}>Older Posts &rarr;</Link>
                                </div>
                            ) }
                            <hr />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = ({ posts }) => {
    return {
        posts
    }
};

const mapDispatchToProps = {
    fetchPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);