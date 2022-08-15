import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Recomend from './pages/Recomend'
import Movie from './pages/Movie'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies/:id" exact element={<Movie />} />
        <Route path="/recomend" exact element={<Recomend />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
