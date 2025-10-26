import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export class TmdbRepository {
  async searchMovies(query: string) {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        language: "pt-BR",
      },
    });
    return response.data;
  }

  async getMovieDetails(id: string) {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "pt-BR",
      },
    });
    return response.data;
  }
}
