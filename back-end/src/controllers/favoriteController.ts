import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const FavoriteController = {
  async toggleFavorite(req: Request, res: Response) {
    try {
      const userId = Number((req as any).userId);
      const { movieId, title, poster } = req.body;
      
      if (!userId || !movieId) {
        return res.status(400).json({ message: "Parâmetros inválidos." });
      }

      const movieIdNum = Number(movieId);

      const existing = await prisma.favorite.findFirst({
        where: { userId, movieId: movieIdNum },
      });

      if (existing) {
        await prisma.favorite.delete({ where: { id: existing.id } });
        return res.json({ message: "Filme removido dos favoritos" });
      }

      const favorite = await prisma.favorite.create({
        data: { movieId: movieIdNum, title, poster, userId },
      });

      return res.json(favorite);
    } catch (error: any) {
      console.error("Erro ao favoritar:", error.message || error);
      return res.status(500).json({
        message: "Erro ao favoritar filme.",
        error: error.message || "Erro desconhecido",
      });
    }
  },

  async getUserFavorites(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = Number(id);

      if (!userId) {
        return res.status(400).json({ message: "ID de usuário inválido." });
      }

      const favorites = await prisma.favorite.findMany({
        where: { userId },
      });

      return res.json(favorites);
    } catch (error: any) {
      console.error("Erro ao buscar favoritos:", error.message || error);
      return res.status(500).json({
        message: "Erro ao buscar favoritos.",
        error: error.message || "Erro desconhecido",
      });
    }
  },
};
