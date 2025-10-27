import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export const addFavorite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { movieId, title, poster } = req.body;

  try {
    const favorite = await prisma.favorite.create({
      data: { userId, movieId, title, poster },
    });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar favorito" });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { movieId } = req.params;

  try {
    await prisma.favorite.deleteMany({ where: { userId, movieId: Number(movieId) } });
    res.status(200).json({ message: "Removido com sucesso" });
  } catch {
    res.status(500).json({ message: "Erro ao remover favorito" });
  }
};

export const getUserFavorites = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const favorites = await prisma.favorite.findMany({ where: { userId: Number(id) } });
    res.json(favorites);
  } catch {
    res.status(500).json({ message: "Erro ao buscar favoritos" });
  }
};
