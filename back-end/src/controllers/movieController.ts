import { Request, Response } from "express";
import { TmdbRepository } from "../repositories/tmdbRepository";

const tmdbRepository = new TmdbRepository();

export class MovieController {
  async search(req: Request, res: Response) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Parâmetro 'query' é obrigatório." });
      }

      const movies = await tmdbRepository.searchMovies(query as string);
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar filmes." });
    }
  }

  async getDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const movie = await tmdbRepository.getMovieDetails(id);
      res.json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar detalhes do filme." });
    }
  }
}
