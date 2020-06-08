import React, { Component } from "react";
import * as d3 from "d3";
import "../../global.js";
import BarChart from '../../containers/BarChart/BarChart'


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

      



  render() {


    return (
      <main>
        <h1>Stats</h1>

        <BarChart filmlist = {this.state.films.results} val = {"popularity"} title="Rating"/>

        <BarChart filmlist = {this.state.films.results} val = {"vote_count"} title="Votes"/>


      </main>
    );
  }

  constructor() {

    super();
    this.state = {
      films: [],
     
    };

  }

}

export default Stats;
