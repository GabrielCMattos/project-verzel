import { Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Erro interno ao registrar usuário." });
  }
};

// ============ Login ============
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const { password: _, ...userData } = user;
    res.json({ user: userData, token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno no login." });
  }
};


export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { name, bio, password } = req.body;

    let avatarUrl: string | undefined;

    if (req.file) {
      const file = req.file;
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.mimetype)) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ message: "Formato de imagem inválido. Use JPG, PNG ou WEBP." });
      }

      if (file.size > maxSize) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ message: "A imagem não pode ultrapassar 2MB." });
      }

      avatarUrl = `/uploads/${file.filename}`;
    }


    const updatedData: any = {};
    if (name) updatedData.name = name;
    if (bio) updatedData.bio = bio;
    if (avatarUrl) updatedData.avatarUrl = avatarUrl;
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    const { password: _, ...userData } = updatedUser;
    res.json(userData);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({ message: "Erro ao atualizar perfil." });
  }
};


export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const { password: _, ...userData } = user;
    res.json(userData);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ message: "Erro ao buscar perfil." });
  }
};
