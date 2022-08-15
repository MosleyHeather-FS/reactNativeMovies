import { Link } from "react-router-dom";
import cinema from "../images/cinema.jpeg";

import "../App.css";

function Home() {
  return (
    <div className="App">
      <header style={styles.page} className="App-header">
        <h1>Welcome to my Page!</h1>
        <div style={styles.container}>
          <p>
            Love movies like me? Awesome! I have a unique taste in movies.
            Fantasy, Romance, Mystery, etc. You name I just about love them all.
          </p>
          <p>
            So choosing my favorites is the worst, but I did it! It was
            exhausting, but I finally figured out the best of the best movies
            for you. To check them on my top movie picks page link below:
          </p>
        </div>
        <Link to="/favorites">My Top Movie Picks</Link>
      </header>
    </div>
  );
}

export default Home;

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
