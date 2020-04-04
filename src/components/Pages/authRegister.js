import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from "../Layouts/header";
import Footer from "../Layouts/footer";

import {registerUser} from '../../actions/auth';

class AuthLogin extends Component {

    static propTypes = {
        auth: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            email: '',
            errors: {
                name: '',
                username: '',
                password: '',
                email: ''
            }
        };
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        // eslint-disable-next-line no-useless-escape
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        let errors = this.state.errors;

        switch (name) {
            case 'name':
                errors.username = value.length < 3 ? 'Name must 3 be characters long' : '';
                break;
            case 'username':
                errors.username = value.length < 3 ? 'Username must 3 be characters long' : '';
                break;
            case 'password':
                errors.password = value.length < 8 ? 'Password must be 8 characters long': '';
                break;
            case 'email':
                errors.email = validEmailRegex.test(value) ? '' : 'Email not valid';
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
        this.props.registerUser(this.state)
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
                                    <h1>User Register</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <form onSubmit={this.handleSubmit}>
                                <div className={'form-group'}>
                                    <label htmlFor={'nameInput'}>Name</label>
                                    <input type={'text'} name={'name'} className={'form-control'} id={'nameInput'} aria-describedby={'nameHelp'} value={this.state.name} onChange={this.handleChange} required />
                                    {errors.name.length > 0 &&
                                    <span className='error'>{errors.name}</span>}
                                </div>
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
                                    <label htmlFor={'emailInput'}>Email</label>
                                    <input type={'email'} name={'email'} className={'form-control'} id={'emailInput'} aria-describedby={'emailHelp'} value={this.state.email} onChange={this.handleChange} required />
                                    {errors.email.length > 0 &&
                                    <span className='error'>{errors.email}</span>}
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
    registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin);