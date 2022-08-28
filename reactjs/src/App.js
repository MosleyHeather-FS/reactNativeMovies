import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

import AuthService from './services/auth.service';
import Home from './pages/Home'
import User from './pages/User'
import Favorites from './pages/Favorites'
import Movie from './pages/Movie'
import SignUp from './pages/SignUp'
import Login from './pages/Login'


function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser;
    if(user){
      setCurrentUser(user)
    }
  }, [])

  const logOut = () => {
    AuthService.logout();
  }

  return (
    <div>
      <header style={styles.header}>
        <Link to="/">Home</Link>
          <div>
            <Link style={styles.login} to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
      </header>
      <div>
        {/* {
          currentUser === true
          ? <h2>Logged In</h2>
          : <h2>Logged Out</h2>
        } */}
      </div>
      <section>
        <Routes>
          <Route path="/movies/:id" exact element={<Movie />} />
          <Route path="/user" exact element={<User />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/favorites" exact element={<Favorites />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;

const styles = {
  header: {
    display: 'flex',
    padding: '30px',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '20px'
  },
  login: {
    marginRight: '20px'
  }
}