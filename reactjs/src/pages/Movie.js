import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function Movie() {
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [values, setValues] = useState({
    name: '',
    class: ''
  })

  const { id } = useParams()
  const navigate = useNavigate();

  const API_BASE = process.env.NODE_ENV === 'development' 
  ? `http://localhost:8000/api/v1` 
  : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let ignore = false;

    if(!ignore) {
      getMovies();
    }

    return () => {
      ignore = true
    }
  }, [])

  const getMovies = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/movies/${id}`)
              .then(res => res.json())
              .then(data => {
                console.log({data})
                setValues({
                    name: data.name,
                    genre: data.genre,
                    rating: data.rating
                })
              })
    } catch(error) {
      setError(error.message || "Unexpected Error")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
      <Link to="/">Home</Link>
        <h1>Movies:</h1>
        <h5>{values && values.name}</h5>
        <p>{values && values.genre}</p>
        <p>{values && values.rating}</p>
      </header>
    </div>
  );
}

export default Movie;
