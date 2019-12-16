import React from 'react';
import './style.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div id="headerBar" className="d-flex">
                <Link to="/home" id="homeTab">Home</Link>
                <Link to="/profile" id="profileTab">Profile</Link>
            </div>
        );
    }
}

export default HeaderBar