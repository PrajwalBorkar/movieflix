import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = useCallback(
    _.debounce(async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      setMovies(data.Search);
    }, 500),
    []
  );

  useEffect(() => {
    // Run once when the component mounts
    searchMovies("Batman");
  }, [searchMovies]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    searchMovies(e.target.value);
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
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
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
