import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Movie from './pages/Movie'
import Recomend from './pages/Recomend'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies/:id" exact element={<Movie />} />
        <Route path="/favorites" exact element={<Favorites />} />
        <Route path="/recomend" exact element={<Recomend />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
