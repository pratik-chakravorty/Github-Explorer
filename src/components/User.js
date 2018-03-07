import React, { Component } from 'react';


import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Spinner from './Spinner'

function ShowUser(props) {
    const { userData } = props;
    return (
        <div className="show-user-container">
            <img src={userData.avatar_url} alt="avatar" />
            <div className="intro-content">
                <a href={userData.html_url} target="_blank"><h2>{userData.name}</h2></a>
                <h4>Followers: {userData.followers}</h4>
                <h4>Following: {userData.following}</h4>
                <h4>Repositories: {userData.public_repos}</h4>
                <h4>Location: {userData.location}</h4>
                <p>{userData.bio}</p>
            </div>
        </div>
    )
}

class User extends Component {

    state = {
        users: {},
        errorMsg: "",
        loading: false
    }

    handleSubmit = (e) => {
        this.setState({ users: {}, errorMsg: "" })
        e.preventDefault();
        const value = this.getInput.value
        this.setState({ loading: true })
        fetch(`http://api.github.com/users/${value}`)
            .then(res => res.json())
            .then(res => {
                if (res.message === "Not Found") {
                    this.setState({
                        errorMsg: "User not found",
                        loading: false
                    })
                    return;
                }
                this.setState({ loading: false })
                this.setState({ users: { ...res } })
            }).catch(err => console.log('User not found'))
    }
    render() {
        return (
            <div className="user-container">
                <h1 className="heading center">Github Explorer</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    <input required className="input" type="text" ref={(input) => this.getInput = input} placeholder="Enter Github Username" />
                    <button className="btn-primary">Search</button>
                </form>
                {this.state.loading ? <Spinner /> : null}
                {this.state.errorMsg ? <ReactCSSTransitionGroup transitionName="error" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <p className="error">{this.state.errorMsg}</p></ReactCSSTransitionGroup> : null}
                {Object.keys(this.state.users).length !== 0 && this.state.users.constructor === Object ?
                    <ReactCSSTransitionGroup
                        transitionName="show"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}
                    >
                        <ShowUser userData={this.state.users} /></ReactCSSTransitionGroup> : null}
            </div>
        );
    }
}

export default User;