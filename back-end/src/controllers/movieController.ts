import { Request, Response } from "express";
import { TmdbRepository } from "../repositories/tmdbRepository";

export const MovieController = {
  async getTopRated(req: Request, res: Response) {
    try {
      const data = await TmdbRepository.getTopRatedMovies();
      return res.json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getMovie(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await TmdbRepository.getMovieById(id);
      return res.json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async search(req: Request, res: Response) {
    try {
      const { q } = req.query;
      const data = await TmdbRepository.searchMovies(q as string);
      return res.json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
};
