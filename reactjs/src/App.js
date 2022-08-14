import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE = process.env.NODE_ENV === 'development' 
  ? `http://localhost:8000` 
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
    try {
      await fetch(`${API_BASE}/movies`)
              .then(res => res.json())
              .then(data => {
                console.log({data})
                setMovies(data)
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
        <h1>Movies:</h1>
        <ul>
          <li>Movies</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
