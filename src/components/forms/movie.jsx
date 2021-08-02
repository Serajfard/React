import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import Joi from "joi-browser";
import BaseForm from "./baseform";
import { getGenres } from "../../services/fakeGenreService";
import { getMovie, saveMovie } from "../../services/fakeMovieService";

const Movie = (props) => {
  let params = useParams();
  let history = useHistory();

  let movie = {
    title: "",
    genre: "",
    numberInStock: "",
    dailyRentalRate: "",
  };
  if (params.id) {
    let result = getMovie(params.id);

    if (!result) {
      history.replace("/not-found");
    } else {
      movie._id = params.id;
      movie.title = result.title;
      movie.genre = { ...result.genre };
      movie.numberInStock = result.numberInStock;
      movie.dailyRentalRate = result.dailyRentalRate;
    }
  }

  let [state, setState] = useState({
    data: {
      ...movie,
    },
    jenres: getGenres(),
    errors: {},
  });

  let schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genre: Joi.object().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Rate"),
  };

  let { renderInput, renderSelect, renderSubmit, handleSubmit } = BaseForm(
    state,
    setState,
    schema,
    onSubmit
  );

  function onSubmit() {
    const movie = { ...state.data };
    movie["genreId"] = movie.genre._id;
    saveMovie(movie);
    history.push("/movies");
  }

  return (
    <div>
      {/* <p>{`Movie Form : ${params.id}`}</p> */}
      <p>Movie Form</p>
      <form onSubmit={handleSubmit}>
        {renderInput("title", "Title")}
        {renderSelect("genre", "Genre", "_id", "name", state.jenres)}
        {renderInput("numberInStock", "Number in Stock", "number")}
        {renderInput("dailyRentalRate", "Rate")}
        {renderSubmit("Save", true)}
      </form>
    </div>
  );
};

export default Movie;
