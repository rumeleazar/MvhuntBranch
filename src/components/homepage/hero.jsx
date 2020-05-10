import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HeroCarousel extends Component {
  constructor() {
    super();
    this.state = {
      nowPlayingMovies: [],
    };
    this.apiKey = this.apiKey = process.env.REACT_APP_API;
  }

  componentDidMount() {
    fetch(
      `
      https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1
      `
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ nowPlayingMovies: [...data.results] });
      });
  }

  render() {
    const settings = {
      infinite: true,
      lazyLoad: true,
      fade: true,
      slidesToShow: 1,
      autoplay: true,
      speed: 2500,
      autoplaySpeed: 3500,
    };

    return (
      <div>
        <Slider {...settings}>
          {this.state.nowPlayingMovies.map(
            (movie, index) => (
              <div className="heroContainer" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt="this is the card pic"
                ></img>
                <h3>Now Playing</h3>
                <h1>
                  {movie.title} ({` ${movie.release_date.slice(0, 4)} `})
                </h1>
                <p>{movie.overview}</p>
              </div>
            ),
            this
          )}
        </Slider>
      </div>
    );
  }
}

export default HeroCarousel;
