import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service"
import MoviesService from "../services/movies.service";
import cinema from "../images/cinema.jpeg";

import "../App.css";

function User() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    name: '',
    genre: '',
    rating: '',
    img: ''
  })

  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    MoviesService.getAllPrivateMovies().then(
        response => {
            setMovies(response.data)
        },
        (error) => {
            console.log("Secured Page Error: ", error.response)
            if (error.response && error.response.status == 403) {
                AuthService.logout()
                navigate('/login')
            }
        }
    )

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

  const createMovie = async () => {
    try {
        await fetch(`${API_BASE}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(() => getMovies())
      } catch(error) {
        setError(error.message || "Unexpected Error")
      } finally {
        setLoading(false)
      }
}

  const handleSubmit = (event) => {
    event.preventDefault();
    createMovie();
}

const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value
    }))
}
  
  return (
    <div className="App">
      <header style={styles.page} className="App-header">
        <h1>User's Profile</h1>
        <p>What are your perfered movies? Add your favorites, and update them whenever you like.</p>
        <form style={styles.form} onSubmit={(event) => handleSubmit(event)}>
            <label>
                Name:
                <input type="text" name="name" value={values.name} onChange={handleInputChanges} />
            </label>
            <label>
                Genre:
                <input type="text" name="genre" value={values.genre} onChange={handleInputChanges} />
            </label>
            <label>
                Rating:
                <select value={values.rating} onChange={handleInputChanges}>
                    <option>NR</option>
                    <option>G</option>
                    <option>PG</option>
                    <option>PG-13</option>
                    <option>R</option>
                </select>
            </label>
            <label>
                Upload Movie Image:
                <input type="file" id="img" name="img" accept="image/*" value={values.img} onChange={handleInputChanges}></input>
            </label>
            <input style={styles.button} type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default User;

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
  },
  form: {
    display: 'grid',
    gap: '30px'
  },
  button: {
    width: '4rem',
    marginLeft: '230px'
  }
}

