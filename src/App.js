import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import Navigation from "./components/NavBar/navbar";
import Carousel from "./components/homepage/carousel";
import HeroCarousel from "./components/homepage/hero";
import SearchResult from "./components/searchpage/search";
import MovieInfo from "./components/Informations/movieinfo";
import Footer from "./components/homepage/footer";
import PersonInfo from "./components/Informations/personInfo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      topratedMovies: [],
      popularMovies: [],
      upcomingMovies: [],
      searchedMovies: [],
      search: "",
    };
    this.apiKey = process.env.REACT_APP_API;
  }

  componentDidMount() {
    window.addEventListener("load", () => {
      this.setState({ load: true });
    });

    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1
      `
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ topratedMovies: [...data.results] });
      });

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=1
      `
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ popularMovies: [...data.results] });
      });

    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=1
        `
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ upcomingMovies: [...data.results] });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("load");
  }

  //BUTTON FUNCTIONS
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSearch = (e) => {
    e.preventDefault();
    if (this.state.search !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.search}
        `
      )
        .then((data) => data.json())
        .then((data) => {
          this.setState({ searchedMovies: [...data.results] });
        });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div
          className="document"
          style={this.state.load ? { opacity: 0 } : { opacity: 1 }}
        ></div>
        <div
          className="document"
          style={this.state.load ? { opacity: 1 } : { opacity: 0 }}
        >
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Fragment>
                  <Navigation
                    handleSearch={this.handleSearch}
                    handleChange={this.handleChange}
                    search={this.state.search}
                  />
                  <HeroCarousel />
                  <h1 className="homeText">TOP RATED MOVIES</h1>
                  <Carousel
                    movies={this.state.topratedMovies}
                    handleFilter={this.handleFilter}
                  />
                  <h1 className="homeText">POPULAR MOVIES</h1>
                  <Carousel
                    movies={this.state.popularMovies}
                    handleFilter={this.handleFilter}
                  />
                  <h1 className="homeText">UPCOMING MOVIES</h1>
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
              render={(props) => (
                <Fragment>
                  <SearchResult
                    handleSearch={this.handleSearch}
                    handleChange={this.handleChange}
                    movies={this.state.searchedMovies}
                    search={this.state.search}
                  />
                </Fragment>
              )}
            />
            <Route path="/details/:movietitle/:movieid" component={MovieInfo} />
            <Route path="/people/:peopleid" component={PersonInfo} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
