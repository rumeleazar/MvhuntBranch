import React, { Component } from "react";
import SearchBar from "./searchbar";

export default class Navigation extends Component {
  render() {
    return (
      <div className="navbar">
        <nav>
          <div className="logo">
            <a href="/">
              <h1>MovieHunt</h1>
            </a>
          </div>
          <div>
            <SearchBar
              handleSearch={this.props.handleSearch}
              handleChange={this.props.handleChange}
              search={this.props.search}
            />
          </div>
        </nav>
      </div>
    );
  }
}
