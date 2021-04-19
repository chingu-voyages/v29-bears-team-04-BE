import { User } from '.prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../index';
import { RouteArgs } from '../types/routeArgs';
import argon2 from 'argon2';

// **** REGISTER ****
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await argon2.hash(password);
  try {
    const newUser: User = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    req.session.userId = newUser.id; 

    return res.status(201).json({
      success: true,
      data: newUser,
    })
  } catch (error) {
    console.log(error);
    return res.status(409);
  }
};

// **** GET ALL USERS ****

export const getAllUsers = async (args: RouteArgs) => {
  const { res } = args;
  const users = await prisma.user.findMany();
  res.send(users);
}