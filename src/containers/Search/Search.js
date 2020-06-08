import React, { Component } from 'react';

import Aux from '../../hoc/Aux'
import  './Search.scss'

class Search extends Component {

  // Component to Look for specific movie by name

    searchData = (event) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${global.apikey}&language=en-US&page=${this.state.pageNumber}&include_adult=false&query=${this.state.input}`)
          .then(res => res.json())
          .then((data) => {
            this.setState({
              films: data,
              discover: "search"
            },() => {
                this.props.handleInput(this.state.films);
                this.props.handleState(this.state.discover);

            })
          })
          .catch(console.log)
      }
    
  searchChangeHandler = (event) => {
    this.setState({ input: event.target.value })
  }

  searchClickHandler = (event) => {
    this.setState({
      search: "Searching " + this.state.input
    })
    this.onSelect();
  }


render() {
        return (
            <Aux>
            <div  className="Search">
              <h2>Search a Movie</h2>
                <input type="text" onChange = {this.searchChangeHandler} />
                <button  onClick={() => { this.searchClickHandler(); this.searchData(); }}>Search</button>
             </div>
            </Aux>
        )
    }


    constructor() {
        super();
        this.state = {
          films: [],          
          discover: "search",
          value: { min: 2000, max: 2020 },
          selectedValue: ""
        };
    
        this.onSelect = this.searchData.bind(this);
    
      }
      
}

export default Search;