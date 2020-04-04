import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import slugify from "slugify";
import appConfig from "../../appConfig";


const Navbar = ({ auth }) => {

    const defaultNavbar = (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container">
                <Link className={'navbar-brand'} to={'/'}>{appConfig.APP_NAME}</Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/about'}>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/contact'}>Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/auth/login'}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/auth/register'}>Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

    const authNavbar = (
        <div>
            {
                auth.error.response ? (
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                        <div className="container">
                            <Link className={'navbar-brand'} to={'/'}>{appConfig.APP_NAME}</Link>
                            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                Menu
                                <i className="fas fa-bars"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className={'nav-link'} to={'/'}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={'nav-link'} to={'/about'}>About</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={'nav-link'} to={'/contact'}>Contact</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={'nav-link'} to={'/auth/login'}>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={'nav-link'} to={'/auth/register'}>Register</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                ) : (
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                        <div className="container">
                            <Link className={'navbar-brand'} to={'/'}>{appConfig.APP_NAME}</Link>
                            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                Menu
                                <i className="fas fa-bars"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className={'nav-link'} to={'/user/' + slugify(String(auth.user.username), { replacement: '-', lower: true })}>{ auth.user.name }</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={'nav-link'} to={'/auth/logout'}>Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                )
            }
        </div>
    );

    return (
        <div>
            { auth.isAuth ? authNavbar : defaultNavbar }
        </div>
    );
};

Navbar.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.array.isRequired
    }).isRequired
};

export default Navbar;