import React, { Component } from "react";
import "./FilmDetails.scss";
import "../../global.js";

class FilmsDetails extends Component {
  componentDidMount() {
    console.log(this.props.location.state.id);
    fetch(
      `https:api.themoviedb.org/3/movie/${this.props.location.state.id}?api_key=${global.apikey}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          film: data,
        });
      })
      .catch(console.log);
  }

  render() {
    console.log(this.state.film);
    return (
      <div className="FilmDetails">
        <div className="LeftColumn">
          <img
            src={
              "https://image.tmdb.org/t/p/w500/" + this.state.film.backdrop_path
            }
            alt={this.state.film.title}
          />
          <img
            src={
              "https://image.tmdb.org/t/p/w500/" + this.state.film.poster_path
            }
            alt={this.state.film.title}
          />
        </div>
        <div className="RightColumn">
          <h1>{this.state.film.title}</h1>
          <p>{this.state.film.release_date}</p>
          <p>
            <a
              href={"https:www.imdb.com/title/" + this.state.film.imdb_id}
              target="_blank"
            >
              Imdb Link
            </a>
          </p>

          <div>
            <h2>Details</h2>
            <p>{this.state.film.overview}.</p>
          </div>

          <h2>Popularity</h2>
          <p>{this.state.film.popularity}.</p>

          <h2>Runtime</h2>
          <p>{this.state.film.runtime}.</p>

          <h2>Details</h2>
          <p>{this.state.film.overview}.</p>

          <h2>vote_count</h2>
          <p>{this.state.film.vote_count}.</p>

          <h2>vote_average</h2>
          <p>{this.state.film.vote_average}.</p>
        </div>
      </div>
    );
  }

  constructor() {
    super();
    this.state = {
      film: [],
    };
  }
}

export default FilmsDetails;
