import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from "./navbar";

import { checkAuth } from "../../actions/auth";


class Header extends Component {

    static propTypes = {
        auth: PropTypes.object
    };

    componentDidMount() {
        if(localStorage.getItem('auth_token')) {
            this.props.checkAuth(localStorage.getItem('auth_token'));
        }
    }

    render() {

        return (
            <div>
                <Navbar auth={this.props.auth} />
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
};

const mapDispatchToProps = {
    checkAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);