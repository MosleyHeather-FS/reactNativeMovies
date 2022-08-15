import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";

function Home() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    name: "",
    class: "",
  });

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getMovies();
    }

    return () => {
      ignore = true;
    };
  }, []);

  const getMovies = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/movies`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setMovies(data);
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies:</h1>
        <ul>
          {movies?.map((movie) => (
            <Link to={`/movies/${movie._id}`}>{movie.name}</Link>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default Home;

