import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MovieList from "./components/MovieList";

function App() {
  return (
    <div className="container w-50 mb-5">
      <MovieList />
    </div>
  );
}

export default App;
