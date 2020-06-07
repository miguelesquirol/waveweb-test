import React  from 'react';

import Aux from '../../hoc/Aux'
import  './Search.scss'

const Search =(props) => {

        return (
            <Aux>
            <div  className="Search">
                <input type="text" onChange = {props.changed} />
                <button  onClick={() => { props.clicked(); props.fetch(); }}   >Search</button>
             </div>
            </Aux>
        )
}

export default Search;