import { User } from '.prisma/client';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../index';
import { RouteArgs } from '../types/routeArgs';

// **** REGISTER ****
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const newUser: User = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
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