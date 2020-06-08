import React, { Component } from "react";
import * as d3 from "d3";
import "../../global.js";
import BarChart from "../../containers/BarChart/BarChart";
import Discover from "../../containers/Discover/Discover";
import "./Stats.scss";

class Stats extends Component {
  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${global.apikey}&language=en-US&page=1&sort_by=popularity.desc&include_adult=false&include_video=false}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          films: data,
        });
      })
      .catch(console.log);
  }

  handleStateValue(val) {
    this.setState({ discover: val });
  }

  handleInputValue(val) {
    this.setState({ films: val });
  }

  render() {
    const inputName = this.state.discover;

    return (
      <main className="StatsWrapper">
        <h1>Stats</h1>
        <h3>
          Compare the Raiting and Votes between the 10 most popular movies by
          genre and decade{" "}
        </h3>

        <Discover
          handleInput={this.handleInputValue}
          handleState={this.handleStateValue}
          pageNumber={this.state.pageNumber}
          genresSelected={this.state.genresSelected}
          handler={this.handler}
        />

        <div className="Graphs">
          <BarChart
            filmlist={this.state.films.results}
            val={"popularity"}
            title="Rating"
            class="rating"
            tolltipTitle = "Points"
          />

          <BarChart
            filmlist={this.state.films.results}
            val={"vote_count"}
            title="Votes"
            class="votes"
            tolltipTitle = "Votes"
          />
        </div>
      </main>
    );
  }

  constructor() {
    super();
    this.state = {
      films: [],
      pageNumber: 1,
      discover: "",
      genresSelected: "All",
      value: { min: 2000, max: 2020 },
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleStateValue = this.handleStateValue.bind(this);
  }
}

export default Stats;
