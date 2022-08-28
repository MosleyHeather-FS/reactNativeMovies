import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from '../services/auth.service';
import cinema from "../images/cinema.jpeg";

import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await AuthService.login(email, password)
      .then(
        response => {
          navigate('/user')
        },
        error => {
          console.error(error)
        }
      )
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header style={styles.page} className="App-header">
        <h1>Login</h1>
        <div style={styles.container}>
          <p>
            Login Page
          </p>
        </div>
        <section>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </section>
      </header>
    </div>
  );
}

export default Login;

const styles = {
  container: {
    margin: "50px 200px",
  },
  page: {
    backgroundImage: `url(${cinema})`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  },
};
