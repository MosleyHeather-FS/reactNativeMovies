import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from '../services/auth.service';
import cinema from "../images/cinema.jpeg";

import "../App.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await AuthService.signup(email, password)
      .then(
        response => {
          navigate('/')
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
        <h1>Sign Up</h1>
        <div style={styles.container}>
          <p>Sign Up Page</p>
        </div>
        <section>
          <form onSubmit={handleSignup}>
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
            <button type="submit">Sign Up</button>
          </form>
        </section>
      </header>
    </div>
  );
}

export default SignUp;

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
