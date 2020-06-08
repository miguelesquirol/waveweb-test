import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import { Multiselect } from "multiselect-react-dropdown";
import InputRange from "react-input-range";
import "../../global.js";
import "react-input-range/lib/css/index.css";
import "./Discover.scss";

class Discover extends Component {
  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${global.apikey}&language=en-US&page=${this.props.pageNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          genres: data,
        });
      })
      .catch(console.log);
  }

  resetValues() {
    this.multiselectRef.current.resetSelectedValues();
  }

  onNext = () => {
    console.log("click");
    var newPageNumber = this.state.pageNumber + 1;
    this.setState({
      pageNumber: newPageNumber,
    });
  };

  onSelect = (selectedList, selectedItem) => {
    // Genres
    let genreList = this.state.genresSelected;
    if (selectedList) {
      genreList = selectedList.map((obj) => obj.id);
      genreList = genreList.join(",");
    }
    this.setState(
      {
        discover: "discover",
        genresSelected: genreList,
      },
      () => {
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${global.apikey}&language=en-US&page=${this.state.pageNumber}&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_date.gte=${this.state.value.min}-01-01&primary_release_date.lte=${this.state.value.max}-12-31&vote_average.gte=6&with_genres=${this.state.genresSelected}`
        )
          .then((res) => res.json())
          .then((data) => {
            this.setState(
              {
                films: data,
              },
              () => {
                this.props.handleInput(this.state.films);
                this.props.handleState(this.state.discover);
              }
            );
          })
          .catch(console.log);
      }
    );
  };

  render() {
    const divStyle = {
      chips: {
        // To change css chips(Selected options)
        background: "#9395D3",
        fontSize: "18px",
        padding: "10px 20px"
      },
      searchBox: {
        margin: "0",
        padding: "0",
        border: "none",
      },
      inputField: {
        background: "#ffffff",
        border: "none",
        margin: "0",
        padding: "0",
        width: "calc(100% - 40px)",
        fontSize: "16px",
        fontWeight: "bold",
        padding: "20px",
        boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.5)",
        outline: "0px",
        marginBottom: "10px",
      },
      multiselectContainer: {
        width: "100%",
      },
     
    };

    return (
      <Aux>
        <div className="Discover">
          <h2>Discover</h2>
          <div className="multiselect">

          <h3>Choose your Genres</h3>
          <p>(You can combine genres)</p>
          <Multiselect
            style={divStyle}
            options={this.state.genres.genres}
            selectedValues={this.state.selectedValues}
            onSelect={this.onSelect}
            onRemove={this.onSelect}
            displayValue="name"
          />
          </div>
          <div className="inputrange">
          <h3>Choose your Decade</h3>
            <InputRange
              maxValue={2020}
              minValue={1900}
              step={10}
              value={this.state.value}
              onChange={(value) => {
                this.setState({ value });
                this.onSelect();
              }}
            />
          </div>
          <button
            onClick={() => {
              this.onNext();
              this.onSelect();
            }}
          >
            Next Page
          </button>
        </div>
      </Aux>
    );
  }

  constructor() {
    super();
    this.state = {
      films: [],
      genres: [],
      genresSelected: "",
      pageNumber: 1,
      selectedValues: "",
      discover: "discover",
      value: { min: 1990, max: 2000 },
    };

    this.onSelect = this.onSelect.bind(this);
  }
}

export default Discover;
