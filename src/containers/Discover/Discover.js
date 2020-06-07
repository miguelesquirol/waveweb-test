import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import SearchResult from './containers/SearchResult/SearchResult'
import { Multiselect } from 'multiselect-react-dropdown';
import InputRange from 'react-input-range';
import './global.js'
import 'react-input-range/lib/css/index.css'
import './App.scss';


class Discover extends Component {

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${global.apikey}&language=en-US&page=${this.state.pageNumber}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          genres: data
        })
      })
      .catch(console.log)
  }

onSelect = (selectedList, selectedItem) => {
  // Genres
  let genreList = this.state.genresSelected;
  if (selectedList){
    genreList = selectedList.map((obj) => obj.id);
    genreList = genreList.join(",");    
  }
  this.setState ({
    discover: true,
    genresSelected: genreList
  }, () => {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${global.apikey}&language=en-US&page=${this.state.pageNumber}&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_date.gte=${this.state.value.min}-01-01&primary_release_date.lte=${this.state.value.max}-12-31&vote_average.gte=6&with_genres=${this.state.genresSelected}`)
  .then(res => res.json())
  .then((data) => {
    this.setState({
      films: data
    })
  })
  .catch(console.log)
})
}
 

  render() {


    return (

      <Layout>
        {/* <Search changed={this.searchChangeHandler} clicked={this.searchClickHandler} fetch={this.searchData} /> */}

        <Multiselect
          options={this.state.genres.genres} // Options to display in the dropdown
          selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
          onSelect={this.onSelect} // Function will trigger on select event
          onRemove={this.onSelect} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          />

        <InputRange
          maxValue={2020}
          minValue={1900}
          step={10}
          value={this.state.value}
          onChange={value => {this.setState({ value }); this.onSelect() }  }/>

      </Layout>

    )
  }


  constructor() {
    super();
    this.state = {
      films: [],
      genres: [],
      genresSelected : "",
      pageNumber : 1,
      discover: false,
      value: { min: 2000, max: 2020 },
    };
  }

}

export default Discover;
