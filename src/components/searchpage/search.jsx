import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Footer from "../homepage/footer";
import Navigation from "../NavBar/navbar";
import ReactImageFallback from "react-image-fallback";
import noimage from "../../assets/images/noimage.png";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.movies,
      search: this.props.search,
      load: false,
    };
    this.apiKey = process.env.REACT_APP_API;
  }

  handleSearch = (e) => {
    e.preventDefault();
    if (this.props.search !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.props.search}
        `
      )
        .then((data) => data.json())
        .then((data) => {
          this.setState({ movie: [...data.results] });
          this.setState({ search: this.props.search });
        });
    }
  };

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.props.match.params.searchtitle}
      `
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ movie: [...data.results] });
        this.setState({ search: this.props.match.params.searchtitle });
        this.setState({ load: true });
      });
  }

  render() {
    console.log(this.props.search);
    return (
      <div>
        <Navigation
          handleSearch={this.handleSearch}
          handleChange={this.props.handleChange}
          search={this.props.search}
        />
        <div
          className="searchDescription"
          style={
            this.state.load
              ? {
                  opacity: 1,
                }
              : { opacity: 0 }
          }
        >
          <h1>SEARCH RESULTS FOR {this.state.search}</h1>
        </div>
        <div
          className="searchDivider"
          style={
            this.state.load
              ? {
                  opacity: 1,
                }
              : { opacity: 0 }
          }
        ></div>
        <div
          className="searchContainer"
          style={
            this.state.load
              ? {
                  opacity: 1,
                }
              : { opacity: 0 }
          }
        >
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
                <ReactImageFallback
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  fallbackImage={noimage}
                  alt="cool image should be here"
                />

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
