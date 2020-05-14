import React from "react";

const Search = (props) => {
    return (
        <div className="search-block">
            <form onSubmit={props.searchVal}>
                <input id="search" name="search" onChange={props.inputHandler} placeholder="Search here" />
                <span>
                    <button id="submit">Search</button>
                </span>
                <p id="alert">{props.state && props.state.alert !== "" ? props.state.alert : null}</p>
                <p>
                    Your search is: <b> {props.search}</b>
                </p>
            </form>
        </div>
    );
};

export default Search;
