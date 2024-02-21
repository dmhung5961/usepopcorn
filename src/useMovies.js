import { useState, useEffect } from "react";

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const KEY = "be986658";

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        // if (!res.ok) {
        //   throw new Error("Something went wrong with fetching the movies");
        // }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        // console.log(err.name);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
      // .then((res) => res.json())
      // .then((data) => setMovies(data.Search));
    }

    // callback?.();

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    // handleCloseMovie();
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
