import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Footer from "../homepage/footer";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: []
    };
  }

  componentDidMount() {
    this.setState({ movie: this.props.movies });
  }
  render() {
    return (
      <div>
        <div className="searchDescription">
          <h1>SEARCH RESULTS FOR {this.props.search}</h1>
        </div>
        <div className="searchDivider"></div>
        <div className="searchContainer">
          {this.state.movie.map((movie, index) => (
            <div className="searchCardContainer" key={index}>
              <a
                href={`/details/${movie.title}/${movie.id}`}
                onClick={() => {
                  this.props.history.push(
                    `/details/${movie.title}/${movie.id}`
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt="this is the card pic"
                ></img>
                <h1>{movie.title}</h1>
              </a>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(SearchResult);
