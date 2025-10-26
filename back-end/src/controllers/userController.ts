import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Router } from "express";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const UserRepository = {
  async createUser(data: { name: string; email: string; password: string }) {
    return prisma.user.create({ data });
  },
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
  async updateProfile(userId: number, data: { bio?: string; avatarUrl?: string }) {
    return prisma.user.update({ where: { id: userId }, data });
  },
  async addFavorite(userId: number, movie: { movieId: number; title: string; poster: string }) {
    return prisma.favorite.create({ data: { ...movie, userId } });
  },
  async getFavorites(userId: number) {
    return prisma.favorite.findMany({ where: { userId } });
  },
};

export const UserController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const existing = await UserRepository.findByEmail(email);
      if (existing) return res.status(400).json({ message: "Email já registrado" });
      const hashed = await bcrypt.hash(password, 10);
      const user = await UserRepository.createUser({ name, email, password: hashed });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao registrar usuário" });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.findByEmail(email);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ message: "Senha incorreta" });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Erro ao fazer login" });
    }
  },
  async updateProfile(req: Request, res: Response) {
    try {
      const { bio, avatarUrl } = req.body;
      const userId = (req as any).userId;
      const updated = await UserRepository.updateProfile(userId, { bio, avatarUrl });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar perfil" });
    }
  },
  async addFavorite(req: Request, res: Response) {
    try {
      const { movieId, title, poster } = req.body;
      const userId = (req as any).userId;
      const fav = await UserRepository.addFavorite(userId, { movieId, title, poster });
      res.status(201).json(fav);
    } catch (error) {
      res.status(500).json({ message: "Erro ao favoritar filme" });
    }
  },
  async getFavorites(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const favorites = await UserRepository.getFavorites(userId);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar favoritos" });
    }
  },
};

import { NextFunction } from "express";
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    (req as any).userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}

const router = Router();
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/profile", authMiddleware, UserController.updateProfile);
router.post("/favorites", authMiddleware, UserController.addFavorite);
router.get("/favorites", authMiddleware, UserController.getFavorites);
export default router;
