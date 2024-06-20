import { useState } from "react";
import { moviesData } from "../movieData";

function MovieList() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState(
    moviesData.map((item) => {
      return { ...item, showDetails: false, fade: false };
    })
  );

  const [originalMovies, _] = useState(movies);

  const handleShowDetails = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, showDetails: !movie.showDetails };
      }
      return movie;
    });

    setMovies(updatedMovies);
  };

  const handleDelete = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, fade: true };
      }
      return movie;
    });

    setMovies(updatedMovies);
    setTimeout(function () {
      setMovies(movies.filter((movie) => movie.id !== id));
    }, 1000);
  };

  const showAllMovies = () => {
    setMovies(originalMovies);
  };

  const showByGenre = () => {
    // Unique genres
    const genres = originalMovies.map((movie) => movie.genre);
    const uniqeGenres = [...new Set(genres)];

    const requestedGenre = prompt(
      `Enter the genre from the available genres: ${uniqeGenres.join(", ")}`
    );

    setMovies(
      originalMovies.filter(
        (movie) => movie.genre.toLowerCase() === requestedGenre.toLowerCase()
      )
    );
  };

  return (
    <div>
      <h1>Movie List</h1>
      <div className="mb-4">
        <button className="btn btn-primary me-3" onClick={showAllMovies}>
          Show All Movies
        </button>
        <button className="btn btn-info" onClick={showByGenre}>
          Show by Genre
        </button>
      </div>

      <ul className="list-group">
        {movies.map(({ id, fade, genre, title, description, showDetails }) => (
          <div key={id}>
            <li
              className="list-group-item d-flex align-items-center bg-light"
              style={{ animation: fade && "fade 1s ease" }}
            >
              <span>
                <b>
                  {title} ({genre}){" "}
                </b>
              </span>
              <button
                className="btn btn-success btn-sm ms-auto me-2"
                onClick={() => handleShowDetails(id)}
              >
                {showDetails ? <span>&#8722;</span> : <span>&#43;</span>}
              </button>
              <button onClick={() => handleDelete(id)}>
                <i className="bi bi-trash3-fill text-danger"></i>
              </button>
            </li>
            {showDetails && (
              <li className="list-group-item text-start">{description}</li>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
