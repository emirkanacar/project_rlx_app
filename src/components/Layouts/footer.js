import React, {Component} from 'react';
import appConfig from "../../appConfig";

class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <ul className="list-inline text-center">
                                    <li className="list-inline-item">
                                        {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                        <a href={appConfig.TWITTER_URL} target={'_blank'}>
                                            <span className="fa-stack fa-lg">
                                                <i className="fas fa-circle fa-stack-2x" />
                                                <i className="fab fa-twitter fa-stack-1x fa-inverse" />
                                            </span>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                        <a href={appConfig.FACEBOOK_URL} target={'_blank'}>
                                            <span className="fa-stack fa-lg">
                                                <i className="fas fa-circle fa-stack-2x" />
                                                <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
                                            </span>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                        <a href={appConfig.GITHUB_URL} target={'_blank'}>
                                            <span className="fa-stack fa-lg">
                                                <i className="fas fa-circle fa-stack-2x" />
                                                <i className="fab fa-github fa-stack-1x fa-inverse" />
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                                <p className="copyright text-muted">{appConfig.APP_COPYRIGHT}</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;