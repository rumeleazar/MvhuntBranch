import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import Navigation from "./NavBar/navbar";
import Carousel from "./homepage/carousel";
import HeroCarousel from "./homepage/hero";
import SearchResult from "./searchpage/search";
import MovieInfo from "./Informations/movieinfo";
import Footer from "./homepage/footer";
import PersonInfo from "./Informations/personInfo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topratedMovies: [],
      popularMovies: [],
      upcomingMovies: [],
      searchedMovies: [],
      search: ""
    };
    this.apiKey = process.env.REACT_APP_API;
  }

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1
      `
    )
      .then(data => data.json())
      .then(data => {
        this.setState({ topratedMovies: [...data.results] });
      });

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=1
      `
    )
      .then(data => data.json())
      .then(data => {
        this.setState({ popularMovies: [...data.results] });
      });

    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=1
        `
    )
      .then(data => data.json())
      .then(data => {
        this.setState({ upcomingMovies: [...data.results] });
      });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ search: e.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.search}
      `
    )
      .then(data => data.json())
      .then(data => {
        this.setState({ searchedMovies: [...data.results] });
      });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Fragment>
                <Navigation
                  handleSearch={this.handleSearch}
                  handleChange={this.handleChange}
                  search={this.state.search}
                />
                <HeroCarousel />
                <h1 className="homeText">Top Rated</h1>
                <Carousel
                  movies={this.state.topratedMovies}
                  handleFilter={this.handleFilter}
                />
                <h1 className="homeText">Popular Movies</h1>
                <Carousel
                  movies={this.state.popularMovies}
                  handleFilter={this.handleFilter}
                />
                <h1 className="homeText">Upcoming Movies</h1>
                <Carousel
                  movies={this.state.upcomingMovies}
                  handleFilter={this.handleFilter}
                />
                <Footer />
              </Fragment>
            )}
          />
          <Route
            path="/search/:searchtitle"
            exact
            render={props => (
              <Fragment>
                <Navigation
                  handleSearch={this.handleSearch}
                  handleChange={this.handleChange}
                  search={this.state.search}
                />
                <SearchResult
                  movies={this.state.searchedMovies}
                  search={this.state.search}
                />
              </Fragment>
            )}
          />
          <Route path="/details/:movietitle/:movieid" component={MovieInfo} />
          <Route path="/people/:peopleid" component={PersonInfo} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
