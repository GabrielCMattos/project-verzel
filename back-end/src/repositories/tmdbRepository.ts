import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.TMDB_BASE_URL;
const apiKey = process.env.TMDB_API_KEY;

export const TmdbRepository = {
  async getTopRatedMovies() {
    try {
      const response = await axios.get(`${baseUrl}/movie/top_rated`, {
        params: {
          api_key: apiKey,
          language: "pt-BR",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Erro TMDB Repository:", error.response?.data || error.message);
      throw new Error("Erro ao buscar filmes no TMDB");
    }
  },

  async getMovieById(id: string) {
    try {
      const response = await axios.get(`${baseUrl}/movie/${id}`, {
        params: {
          api_key: apiKey,
          language: "pt-BR",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Erro TMDB Repository:", error.response?.data || error.message);
      throw new Error("Erro ao buscar detalhes do filme no TMDB");
    }
  },

  async searchMovies(query: string) {
    try {
      const response = await axios.get(`${baseUrl}/search/movie`, {
        params: {
          api_key: apiKey,
          query,
          language: "pt-BR",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Erro TMDB Repository:", error.response?.data || error.message);
      throw new Error("Erro ao buscar filmes por pesquisa");
    }
  },
};
