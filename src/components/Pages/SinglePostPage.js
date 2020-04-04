import React, {Component} from 'react';
import {Redirect} from "react-router";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { fetchSinglePost } from "../../actions/singlePost";

import SinglePost from "../Layouts/singlePost";
import Header from "../Layouts/header";
import Footer from "../Layouts/footer";

class SinglePostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paramError: false,
            postId: null
        };
    }

    static propTypes = {
        post: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { match } = this.props;
        if(!match.params.post_id) {
            this.setState({ paramError: true });
        }else {
            const postID = match.params.post_id.split('_')[1];
            this.setState({ postId: postID });
            this.props.fetchSinglePost(postID);
        }
    }

    render() {
        return (
            <div>
                { this.state.paramError === true ? <Redirect to={'/'} /> : '' }
                { this.state.postId === undefined ? <Redirect to={'/'} /> : '' }
                <Header />
                <SinglePost post={this.props.post} />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = ({ post }) => {
    return {
        post
    }
};

const mapDispatchToProps = {
    fetchSinglePost
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostPage);