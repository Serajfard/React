import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import Table from "../table/table";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import Pagination from "../table/pagination";
import PaginationUtil from "../utils/pagination";
import List from "../list";
import _ from "lodash";
import Like from "../like";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";

const Movies = function (props) {
  let history = useHistory();
  const auth = useAuth();

  const user = auth.getUser();

  let [movies, setMovies] = useState(
    getMovies().map((item) => ({ ...item, like: false }))
  );

  let [paginationObj, setPaginationObj] = useState({ current: 1, pageSize: 4 });
  let [sortObj, setSortObj] = useState({ path: "title", order: "asc" });
  let [genreListObj, setGenreListObj] = useState({
    genres: [{ _id: "", name: "All Genres" }, ...getGenres()],
    currentGenreId: "",
  });
  let [searchFilterState, setSearchFilter] = useState({ searchFilter: "" });

  function deleteHandler(id) {
    setMovies(movies.filter((m) => m._id !== id));
  }

  function onLikeClickHandler(id) {
    setMovies(movies.map((m) => (m._id === id ? { ...m, like: !m.like } : m)));
  }

  function onPageChangeHandler(page) {
    setPaginationObj({ ...paginationObj, current: page });
  }

  function onItemClickHandler(item) {
    setSearchFilter({ searchFilter: "" });
    setGenreListObj({ ...genreListObj, currentGenreId: item._id });
    setPaginationObj({ ...paginationObj, current: 1 });
  }

  function onSearch(e) {
    setSearchFilter({ searchFilter: e.currentTarget.value });
    setGenreListObj({ ...genreListObj, currentGenreId: "" });
    setPaginationObj({ ...paginationObj, current: 1 });
  }

  function onSortHandler(newSortObj) {
    setSortObj(newSortObj);
  }

  // if (movies.length === 0) return <h1>There is no movie in DB</h1>;

  let displayMovies = [];
  if (genreListObj.currentGenreId === "") {
    displayMovies =
      searchFilterState.searchFilter !== ""
        ? [
            ...movies.filter(
              (m) =>
                m.title
                  .toLowerCase()
                  .indexOf(searchFilterState.searchFilter.toLowerCase()) >= 0
            ),
          ]
        : [...movies];
  } else {
    displayMovies = movies.filter(
      (movie) => movie.genre._id === genreListObj.currentGenreId
    );
  }

  let sorted = _.orderBy(displayMovies, [sortObj.path], [sortObj.order]);

  let sliceMovies = PaginationUtil(
    sorted,
    paginationObj.current,
    paginationObj.pageSize
  );

  let columns = [
    {
      label: "Title",
      path: "title",
      content: (item) => <Link to={`/movies/${item._id}`}>{item.title}</Link>,
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: (item) => (
        <Like onLike={() => onLikeClickHandler(item._id)} like={item.like} />
      ),
    },
    {
      key: "button",
      content: (item) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteHandler(item._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <List
            items={genreListObj.genres}
            currentItemId={genreListObj.currentGenreId}
            onItemClick={onItemClickHandler}
          />
        </div>
        <div className="col">
          {user && (
            <button
              className="btn btn-primary"
              onClick={(e) => history.push("/movies/new")}
            >
              New Movie
            </button>
          )}
          <h1>There is {sliceMovies.length} movie in DB</h1>
          <div className="form-group">
            <input
              value={searchFilterState.searchFilter}
              name="search"
              id="search"
              placeholder="Search ..."
              className="form-control"
              onChange={onSearch}
            />
          </div>
          <Table
            items={sliceMovies}
            columns={columns}
            onSort={onSortHandler}
            sortColumn={sortObj}
          />
          <Pagination
            ItemCounts={displayMovies.length}
            pageSize={paginationObj.pageSize}
            current={paginationObj.current}
            onPageChange={onPageChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
