import React from "react";
import { withRouter } from "react-router-dom";

function SearchBar(props) {
  function ButtonRedirect() {
    if (props.search !== "") {
      setTimeout(function() {
        props.history.push(`/search/${props.search}`);
      }, 800);
    }
  }
  return (
    <div className="searchbar">
      <form action="" onSubmit={props.handleSearch}>
        <input
          type="text"
          placeholder="Search.."
          name="search"
          onChange={props.handleChange}
        ></input>
        <button type="submit" onClick={ButtonRedirect}>
          Search
        </button>
      </form>
    </div>
  );
}

export default withRouter(SearchBar);
