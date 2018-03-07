import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Home extends Component {
    render() {
        return (
            <div className="home-section">
                <h1 className="heading">Github Explorer</h1>
                <div className="section-links">
                    <Link to="/user">
                        <button className="btn-primary first">Users</button>
                    </Link>
                    <Link to="/repo">
                        <button className="btn-primary second">Repo</button>
                    </Link>
                    <Link to="/trending">
                        <button className="btn-primary second">Trending</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;