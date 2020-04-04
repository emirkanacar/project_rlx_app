import React, {Component} from 'react';
import {Redirect} from "react-router";

class AuthLogout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasLogout: false
        };
    }

    componentDidMount() {
        if(localStorage.getItem('auth_token'))
        {
            localStorage.removeItem('auth_token');
            this.setState({ hasLogout: true });
        }
    }

    render() {
        return (
            <div>
                { this.state.hasLogout ? (<Redirect to={'/'} />) : <Redirect to={'/'} /> }
            </div>
        );
    }
}



export default AuthLogout;