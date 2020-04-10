import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import appConfig from "../../appConfig";

import {fetchPosts} from "../../actions/posts";

import PostList from '../Layouts/postList';
import Header from "../Layouts/header";
import Footer from "../Layouts/footer";

import '../../assets/App.css';
import {Helmet} from "react-helmet";

class OlderPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    static propTypes = {
        posts: PropTypes.object.isRequired
    };

    componentDidMount() {
        if (this.props.location.search.length > 0) {
            let page = this.props.location.search.split('=')[1];
            this.setState({currentPage: page});
            this.props.fetchPosts(page);
        } else {
            this.props.fetchPosts(this.state.currentPage);
        }
    }

    increasePage = event => {
        event.preventDefault();
        this.setState({currentPage: parseInt(this.state.currentPage) + 1})
    };
    decreasePage = event => {
        event.preventDefault();
        this.setState({currentPage: parseInt(this.state.currentPage) - 1})
    };

    render() {
        return (
            <div>
                <Helmet>
                    <title>{appConfig.APP_NAME + ' - Older Posts'} </title>
                </Helmet>
                <Header/>
                <header className="masthead" style={{backgroundImage: "url('img/home-bg.jpg')"}}>
                    <div className="overlay"/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="site-heading">
                                    <h1>Older Posts</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <PostList posts={this.props.posts}/>
                            {this.props.posts.postList.length === 0 ? (<p>No post</p>) : (
                                <div className="clearfix">
                                    {console.log(this.state)}
                                    {parseInt(this.state.currentPage) === 1 ? (
                                        <div>
                                            <a className="btn btn-primary float-right"
                                               href={'/posts/list?page=' + (parseInt(this.state.currentPage) + 1)}>Next
                                                Page &rarr;</a>
                                        </div>
                                    ) : (
                                        <div>
                                            {parseInt(this.state.currentPage) >= this.props.posts.postList[0].totalPages ? (
                                                <a className="btn btn-primary float-left"
                                                   href={'/posts/list?page=' + (parseInt(this.state.currentPage) - 1)}>&#8592; Previous
                                                    Page</a>
                                            ) : (
                                                <div>
                                                    {parseInt(this.state.currentPage) !== 1 ? (
                                                        <a className="btn btn-primary float-left"
                                                           href={'/posts/list?page=' + (parseInt(this.state.currentPage) - 1)}> &#8592; Previous
                                                            Page</a>) : ('')}
                                                    <a className="btn btn-primary float-right"
                                                       href={'/posts/list?page=' + (parseInt(this.state.currentPage) + 1)}>Next
                                                        Page &rarr;</a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                            <hr/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = ({posts}) => {
    return {
        posts
    }
};

const mapDispatchToProps = {
    fetchPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(OlderPosts);