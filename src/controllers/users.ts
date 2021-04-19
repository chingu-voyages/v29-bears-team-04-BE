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

//  **** LOGIN ****

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });
  
    if(!user){
      return res.status(404).json({
          errors: [{
            message: "Email incorrect/Email not found.",
            field: "email"
          }]
      })
    };
  
    const isValid = await argon2.verify(user.password, password);
  
    if(!isValid){
      return res.status(401).json({
        errors: [{
          message: "Incorrect password",
          field: "password"
        }]
      });
    };
    
    req.session.userId = user.id;
  
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
    })
  }
}

// **** GET ALL USERS ****

export const getAllUsers = async (args: RouteArgs) => {
  const { res } = args;
  const users = await prisma.user.findMany();
  res.send(users);
}