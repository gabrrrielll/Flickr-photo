import React, { Component } from "react";
import Search from "./components/Search";
import View from "./components/View";
import "./App.css";
import { getdata } from "./components/getData";
require("dotenv").config();
class App extends Component {
    state = {
        searchText: "",
        lastSearch: false,
        items: [],
        pageNumber: 1,
        pages: 1,
        allPagesLoads: false,
        message: "Loading . . .",
        alert: "",
    };

    inputHandler = (e) => {
        this.setState({ searchText: e.target.value, pageNumber: 1, alert: "" });
    };

    getApiData = async () => {
        let url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=" + process.env.REACT_APP_SECRET_KEY + "&is_getty=1&page=" + this.state.pageNumber;

        if (this.state.searchText.length > 2) {
            url += "&tags=" + this.state.searchText;
        }

        var response = await getdata(url);
        var res = response.data.photos;

        if (this.state.pageNumber < res.pages && res.pages > 1) {
            this.setState({
                message: "Loading . . .",
                allPagesLoads: false,
            });
        } else if (this.state.pageNumber >= res.pages && res.pages > 0) {
            this.setState({
                message: "That's all folks",
                allPagesLoads: true,
                pageNumber: 1,
            });
        } else if (res.pages === 0) {
            this.setState({
                message: "Nothing here!  🤷 Search another word.",
                allPagesLoads: true,
            });
        }

        this.setState({
            items: [...this.state.items, ...res.photo],
            pages: res.pages,
            pageNumber: this.state.pageNumber + 1,
            lastSearch: this.state.searchText,
        });
    };

    componentDidMount() {
        this.getApiData();

        let options = {
            root: document.querySelector(".view"),
        };

        let callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !this.state.allPagesLoads && this.state.items.length > 0) {
                    this.getApiData();
                }
            });
        };

        let observer = new IntersectionObserver(callback, options);

        let target = document && document.querySelector("#end");

        observer.observe(target);
    }

    searchVal = (e) => {
        e.preventDefault();

        if (this.state.searchText.length > 2) {
            this.setState({ items: [], pageNumber: 1, alert: "" });
            this.getApiData();
        } else this.setState({ alert: "Search tag must contain minim three characters" });
    };

    render() {
        return (
            <div className="view">
                <Search inputHandler={this.inputHandler} search={this.state.searchText} searchVal={this.searchVal} state={this.state} />
                <View state={this.state} />
                <div id="end">
                    <h3>{this.state.message}</h3>
                </div>
            </div>
        );
    }
}

export default App;
