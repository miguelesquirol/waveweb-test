import React, { Component } from "react";
//
import Layout from "./components/Layout/Layout";
import Search from "./containers/Search/Search";
import SearchResult from "./containers/SearchResult/SearchResult";
import Discover from "./containers/Discover/Discover";

import "./global.js";
import "react-input-range/lib/css/index.css";
import "./App.scss";


// Home page, and function that permits to show/hide the inputs accordingly.

class App extends Component {
  handleClick = () => {
    console.log("click");
  };

  handleInputValue(val) {
    this.setState({ films: val });
  }

  handleStateValue(val) {
    this.setState({ discover: val });
  }

  onReset = () => {
    this.setState({
      discover: "",
      films: [],
      value: { min: 2000, max: 2020 },
      state: this.state,
    });
  };

  render() {
    let input1, input2;
    const inputName = this.state.discover;

    if (inputName != "search") {
      input1 = (
        <Discover
          handleInput={this.handleInputValue}
          handleState={this.handleStateValue}
          pageNumber={this.state.pageNumber}
          genresSelected={this.state.genresSelected}
        />
      );
    } 
    
    if (inputName != "discover") {
      input2 = (
        <Search
          handleInput={this.handleInputValue}
          handleState={this.handleStateValue}
        />
      );
    }

    return (
      <Layout>
        <div className="wraper">
          <div className="reset">
            <button onClick={() => this.onReset()}>Reset</button>
          </div>
          <div className="center">
            {input1}

            {input2}
          </div>

          <div className="center">
            <SearchResult
              search={this.state.search}
              filmlist={this.state.films.results}
            />
          </div>
        </div>
      </Layout>
    );
  }

  constructor() {
    super();
    this.state = {
      films: [],
      pageNumber: 1,
      discover: "",
      genresSelected: "",
      value: { min: 2000, max: 2020 },
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleStateValue = this.handleStateValue.bind(this);
  }
}

export default App;
