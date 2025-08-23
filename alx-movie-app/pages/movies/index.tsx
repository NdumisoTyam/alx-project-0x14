import { useCallback, useEffect, useState } from "react";
import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";

const Movies: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<string>("All");
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/fetch-movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page,
          year,
          genre: genre === "All" ? "" : genre,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Error ${response.status}`);
      }

      const data = await response.json();
      setMovies(data.movies ?? []);
    } catch (err: any) {
      console.error("FetchMovies error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, year, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            onChange={(e) => setYear(Number(e.target.value))}
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
          >
            <option value="">Select Year</option>
            {[2024, 2023, 2022, 2021, 2020, 2019].map((y) => (
              <option value={y} key={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>

        {/* Heading & Genre Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">
            {(year ?? "All Years") + " " + genre} Movie List
          </h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {["All", "Animation", "Comedy", "Fantasy"].map((g, i) => (
              <Button key={i} title={g} action={() => setGenre(g)} />
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-400 p-4">
            <p>Couldn’t load movies:</p>
            <pre>{error}</pre>
            <Button title="Retry" action={fetchMovies} />
          </div>
        )}

        {/* Movie Grid & Pagination */}
        {!error && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
              {movies.map((movie, idx) => (
                <MovieCard
                  key={idx}
                  title={movie.titleText?.text ?? 'Untitled'}
                  posterImage={movie.primaryImage?.url}
                  releaseYear={movie.releaseYear?.year ?? 'Unknown'}
                />
              ))}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                title="Previous"
                action={() =>
                  setPage((prev) => (prev > 1 ? prev - 1 : 1))
                }
              />
              <Button title="Next" action={() => setPage(page + 1)} />
            </div>
          </>
        )}
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default Movies;