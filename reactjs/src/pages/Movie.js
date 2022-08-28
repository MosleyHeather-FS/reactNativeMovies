import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import cinema from "../images/cinema.jpeg";
import '../App.css';

function Movie() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [values, setValues] = useState({
    name: '',
    genre: ''
  })

  const { id } = useParams()

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
                    rating: data.rating,
                    img: data.img
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
      <header style={styles.page} className="App-header">
      <Link to="/">Home</Link>
      <Link to="/favorites">Top Movie Picks</Link>
        <h3>{values && values.name}</h3>
        <p>{values && values.genre}</p>
        <p>{values && values.rating}</p>
        <img style={styles.img} src= {values && values.img}></img>
      </header>
    </div>
  );
}

export default Movie;

const styles = {
  page: {
    backgroundImage: `url(${cinema})`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  },
  img: {
    width: '30%'
  }
}