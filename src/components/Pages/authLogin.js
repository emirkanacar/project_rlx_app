import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from "../Layouts/header";
import Footer from "../Layouts/footer";

import {loginUser} from '../../actions/auth';
import {Redirect} from "react-router";

class AuthLogin extends Component {

    static propTypes = {
        auth: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {
                username: '',
                password: ''
            }
        };
    }

    handleChange = event => {
        event.preventDefault()
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'username':
                errors.username = value.length < 3 ? 'Username must 3 be characters long' : '';
            break;
            case 'password':
                errors.password = value.length < 8 ? 'Password must be 8 characters long': '';
            break;
            default:
            break;
        }

        this.setState({
            [name]: value,
            errors
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.loginUser(this.state)
    };

    componentDidMount() {
        if(localStorage.getItem('auth_token')) {
            window.location = '/';
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <Header />
                <header className="masthead" style={{ backgroundImage: "url('img/home-bg.jpg')" }}>
                    <div className="overlay"/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="site-heading" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
                                    <h1>User Login</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className={'login-messages'}>
                                { this.props.auth.isAuth ? (
                                    this.props.auth.user.username ? (
                                        <div className="alert alert-success" role="alert">
                                            You have successfully logged in. You are being directed. }
                                            <Redirect to={'/'} />)
                                        </div>
                                    ) : ''
                                ) : (
                                     this.props.auth.error.message ? (
                                        <div className="alert alert-danger" role="alert">
                                        {this.props.auth.error.response.data.message}
                                        </div>
                                        ) : ''
                                ) }
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className={'form-group'}>
                                    <label htmlFor={'usernameInput'}>Username</label>
                                    <input type={'text'} name={'username'} className={'form-control'} id={'usernameInput'} aria-describedby={'usernameHelp'} value={this.state.username} onChange={this.handleChange} required />
                                    {errors.username.length > 0 &&
                                    <span className='error'>{errors.username}</span>}
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor={'passwordInput'}>Password</label>
                                    <input type={'password'} name={'password'} className={'form-control'} id={'passwordInput'} aria-describedby={'passwordHelp'} value={this.state.password} onChange={this.handleChange} required />
                                    {errors.password.length > 0 &&
                                    <span className='error'>{errors.password}</span>}
                                </div>
                                <div className={'form-group'}>
                                    <button type={'submit'} className={'btn btn-primary'}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
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
    loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin);