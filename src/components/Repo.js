import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Spinner from './Spinner'


function ShowRepos(props) {
    const { repoData } = props;
    return (
        <div className="show-repo-container">
            <a href={repoData.html_url} className="center heading" target="_blank">{repoData.full_name}</a>
            <div className="stats-content">
                <h4>Language: {repoData.language ? repoData.language : "N/A"}</h4>
                <h4>Forks: {repoData.forks}</h4>
                <h4>Stars: {repoData.stargazers_count}</h4>
            </div>
            <p className="paragraph center">{repoData.description}</p>

        </div>
    )
}

class Repo extends Component {
    state = {
        repos: {},
        errorMsg: "",
        loading: false
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.setState({ repos: {}, errorMsg: "" })
        const repoName = this.getInput.value;
        this.setState({ loading: true })
        fetch(`https://api.github.com/search/repositories?q=${repoName}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.items.length === 0) {
                    this.setState({
                        errorMsg: "Repo not found",
                        loading: false
                    })
                    return;
                }
                this.setState({
                    repos: res.items[0],
                    loading: false,

                })
                console.log(this.state.repos)
            })
    }
    render() {
        return (
            <div className="repos-container">
                <h1 className="heading center">Github Explorer</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    <input required className="input" type="text" ref={(input) => this.getInput = input} placeholder="Enter Repository Name" />
                    <button className="btn-primary">Search</button>
                </form>

                {this.state.loading ? <Spinner /> : null}
                {this.state.errorMsg ? <ReactCSSTransitionGroup transitionName="error" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <p className="error">{this.state.errorMsg}</p></ReactCSSTransitionGroup> : null}
                {Object.keys(this.state.repos).length !== 0 && this.state.repos.constructor === Object ?
                    <ReactCSSTransitionGroup
                        transitionName="show"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}
                    >
                        <ShowRepos repoData={this.state.repos} /></ReactCSSTransitionGroup> : null}




            </div>
        );
    }
}

export default Repo;