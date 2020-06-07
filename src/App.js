import React, { Component } from 'react';
//
import Layout from './components/Layout/Layout'
import Search from './containers/Search/Search'
import SearchResult from './containers/SearchResult/SearchResult'
import { Multiselect } from 'multiselect-react-dropdown';
import InputRange from 'react-input-range';
import './global.js'
import 'react-input-range/lib/css/index.css'
import './App.scss';


class App extends Component {

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



  searchChangeHandler = (event) => {
    this.setState({ input: event.target.value })
  }

  onNext = (event) => {
    var newPageNumber = this.state.pageNumber + 1;
    console.log(this.state.pageNumber)
    this.setState({
      pageNumber: newPageNumber
    })
  }

  searchClickHandler = (event) => {
    this.setState({
      search: "Searching " + this.state.input
    })
    this.onSelect();
  }



  searchData = (event) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${global.apikey}&language=en-US&page=${this.state.pageNumber}&include_adult=false&query=${this.state.input}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          films: data,
          discover: false,
        })
      })
      .catch(console.log)
  }

  discoverData = (event) => {

   
  }


  

onSelect = (selectedList, selectedItem) => {
  console.log("what")
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

    function ShowNext() {
      return <button onClick={() => { this.onNext(); this.onSelect(); }}>Next Page</button>;
    }


    function ShowNavigation(props) {
      if (props.discover) {
        return <ShowNext />;
      }
      return "";    
    }


    function logOnChange(state) {
      console.log(state.value);
    }


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

        <SearchResult search={this.state.search} filmlist={this.state.films.results} />

        <ShowNavigation discover={this.state.discover}/>
        

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

export default App;
