import React, { Component } from "react";
import "./FilmDetails.scss";
import "../../global.js";
import Donut from "../../containers/Donut/Donut";
import Rate from "../Rate/Rate"
import noPoster from '../../assets/no-poster.jpg';


// Page with the details of each Film

class FilmsDetails extends Component {
  componentDidMount() {
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


    function Poster(props) {
      if (props.poster == null) {
        return <img src={noPoster}  alt="No Poster"/>;
      } else {
        return (
          <img
            src={"https://image.tmdb.org/t/p/w500/" + props.poster}
            alt={props.title}
          />
        );
      }
    }

    const divStyle = {
      backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.film.backdrop_path})`,
    };

    const date = this.state.film.release_date;
    if (date) {
      var releaseDate = date.substring(0, 4);
    }
    
    return (
      <div className="FilmDetails">
        <div className="Cover" style={divStyle}></div>

        <div className="LeftColumn">
        <Poster poster={this.state.film.poster_path} title={this.state.film.title} />

          <Rate />
          <div className="Details">
            <h1>{this.state.film.title}</h1>
            <p><strong>Year</strong> {releaseDate}</p>
            
            <p><strong>Runtime</strong> {this.state.film.runtime} min.</p>

            <p>
              <a
                href={"https:www.imdb.com/title/" + this.state.film.imdb_id}
                target="_blank"
              >
                Imdb Link
              </a>
            </p>


            
          </div>
          <div className="Data">
          <div>

            <Donut
              partial={this.state.film.popularity}
              total={100}
              scale={100}
              class={"popularity"}
              title={"Popularity"}
            />
          </div>

          <div>

            <Donut
              partial={this.state.film.vote_average}
              total={this.state.film.vote_count}
              scale={10}
              class={"total_votes"}
              title={"Total Votes"}
            />
          </div>
          </div>

        </div>
        <div className="RightColumn">
          <div className="Details">
            <h2>Details</h2>
            <p>{this.state.film.overview}.</p>
          </div>
          

          

       

        </div>
      </div>
    );
  }

  constructor() {
    super();
    this.state = {
      film: [],
      width: 450,
      height: 450,
      margin: 40,
    };
  }
}

export default FilmsDetails;
