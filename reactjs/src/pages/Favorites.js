import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cinema from "../images/cinema.jpeg";

import "../App.css";

function Favorites() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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
      <header style={styles.page} className="App-header">
        <h1>My Top Favorite Movies:</h1>
        <ul style={styles.container}>
          {movies?.map((movie) => (
            <Link to={`/movies/${movie._id}`}><img style={styles.img} src={movie.img}></img></Link>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default Favorites;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px'
  },
  margin: {
    marginBottom: '100px'
  },
  img: {
    width: '150px'
  },
  page: {
    backgroundImage: `url(${cinema})`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  }
}

