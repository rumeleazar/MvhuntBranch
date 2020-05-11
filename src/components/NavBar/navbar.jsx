import React, { Component } from "react";
import SearchBar from "./searchbar";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <div className="navbar">
        <nav>
          <div className="logo">
            <Link to="/">
              <h1>MVHunt</h1>
            </Link>
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
