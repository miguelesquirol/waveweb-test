import React  from 'react';
import Films from '../../components/Film/Film'
import './SearchResult.scss'
import Aux from '../../hoc/Aux'

const SearchResult = (props) => {
        return (


            <Aux>
                <h1 className="SearchTitle"> {props.search}</h1>
                <div className="SearchResult">

                {
                props.filmlist
                            ? props.filmlist.map(film => {
                                return <div key={`film-${film.id}`} className="FilmSingle">
                                <Films  id={film.id}
                                        title={film.title}
                                        poster={film.poster_path}
                                        />
                                </div>;
                              })
                            : null
}
</div>

            </Aux>
        )
}

export default SearchResult;