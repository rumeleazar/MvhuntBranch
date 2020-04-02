import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transformValue: 0,
      rightValue: 0
    };
  }

  carouselRight = e => {
    e.preventDefault();

    if (this.state.rightValue < this.props.movies.length - 5) {
      this.setState({ rightValue: this.state.rightValue + 1 });
      this.setState({ transformValue: this.state.transformValue - 120.5 });
    }
  };
  carouselLeft = e => {
    e.preventDefault();
    if (this.state.transformValue < 0) {
      this.setState({ rightValue: this.state.rightValue - 2 });
      this.setState({ transformValue: this.state.transformValue + 120.5 });
    }
  };

  render() {
    return (
      <div className="carousel">
        <div className="leftButton">
          <button onClick={this.carouselLeft}>Left</button>
        </div>
        <div className="movieContainer">
          {this.props.movies.map((movie, index) => (
            <div
              className="cardContainer"
              key={index}
              style={{
                transform: `translateX(${this.state.transformValue}%)`
              }}
            >
              <a
                href={`/details/${movie.title}/${movie.id}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.history.push(
                    `/details/${movie.title}/${movie.id}`
                  );
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt="this is the card pic"
                ></img>
                <p>{movie.title}</p>
              </a>
            </div>
          ))}
        </div>
        <div className="rightButton">
          <button onClick={this.carouselRight}>Right</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Carousel);
