import { Request, Response } from "express";
import { TmdbRepository } from "../repositories/tmdbRepository";

export const MovieController = {
  async getTopRated(req: Request, res: Response) {
    try {
      const data = await TmdbRepository.getTopRatedMovies();
      res.json(data);
    } catch (error: any) {
      console.error("Erro Controller:", error.message);
      res.status(500).json({ error: "Erro ao buscar filmes populares." });
    }
  },

  async getMovie(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await TmdbRepository.getMovieById(id);
      res.json(data);
    } catch (error: any) {
      console.error("Erro Controller:", error.message);
      res.status(500).json({ error: "Erro ao buscar detalhes do filme." });
    }
  },

  async search(req: Request, res: Response) {
    try {
      const { q } = req.query;
      const data = await TmdbRepository.searchMovies(q as string);
      res.json(data);
    } catch (error: any) {
      console.error(" Erro Controller:", error.message);
      res.status(500).json({ error: "Erro ao buscar filmes por nome." });
    }
  },
};
