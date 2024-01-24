import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import "./App.css";

const ApiKey = process.env.REACT_APP_API_KEY;

const API_URL = `https://www.omdbapi.com?apikey=${ApiKey}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = useCallback(
    _.debounce(async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
    }, 500),
    [] // No dependencies, as we don't want to recreate the debounce function
  );

  useEffect(() => {
    searchMovies("Batman");
  }, [searchMovies, searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    searchMovies(searchTerm);
  };

  return (
    <div className="app">
      <h1>MovieFlix</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for Movies"
        />
        <img src={SearchIcon} alt="search" onClick={handleSearchClick} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h1>No Movies Found</h1>
        </div>
      )}
    </div>
  );
};

export default App;
