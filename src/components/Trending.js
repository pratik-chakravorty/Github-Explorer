import React, { Component } from 'react';

import Spinner from './Spinner';

function ShowTrending(props) {
    const { trendingData } = props;
    return (

        <div className="show-trending-container">

            {trendingData.map((item, index) => {
                return (

                    <div key={index} className="trending-item">

                        <a href={item.html_url} className="trending-heading center">{item.name}</a>
                        <div className="intro-heading">
                            <h3 className="heading-3">Stars: {item.stargazers_count}</h3>
                            <h3 className="heading-3">Forks: {item.forks}</h3>
                        </div>
                        <p className="trending-paragraph">{item.description}</p>
                    </div>

                )
            })}
        </div>
    )
}

class Trending extends Component {

    state = {
        trending: [],
        errorMsg: "",
        loading: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            trending: [],
            loading: true
        })
        const language = this.getInput.value;
        const url = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

        fetch(url).then(res => res.json())
            .then(res => {
                this.setState({
                    trending: res.items,
                    loading: false
                })
                console.log(this.state.trending);
            })
    }
    render() {
        return (
            <div className="trending-container">
                <h1 className="center heading">Github Explorer</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    <input required className="input" type="text" ref={(input) => this.getInput = input} placeholder="Enter Programming Language" />
                    <button className="btn-primary">Search</button>
                </form>
                {this.state.loading ? <Spinner /> : null}
                {this.state.trending ?

                    <ShowTrending trendingData={this.state.trending} /> : null}
            </div>
        );
    }
}

export default Trending;