import React from "react";
import { Link } from "react-router-dom";
import "./Film.scss";
import noPoster from '../../assets/no-poster.jpg';

const Films = (props) => {
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

  return (
    <Link
      to={{
        pathname: "/films/" + props.id + "",
        state: {
          id: props.id,
          title: props.title,
          year: props.year,
          type: props.type,
          imdb: props.imdb,
          poster: props.poster,
        },
      }}
    >
     
      <div className="FilmCard">
        <Poster poster={props.poster} title={props.title} />

        <div>
          <h3>{props.type}</h3>
          <p>{props.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default Films;
