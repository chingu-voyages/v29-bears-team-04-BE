import { Request, Response } from 'express';
import upload from '../utils/multer';
import { prisma } from '../index';

export const addPhoto = async(req: Request, res: Response) => {
  const singleUpload = upload.single('image');
  const { title } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: req.session.userId
    }
  });

  if(!user){
    return res.status(401).json({
      success: false,
      errors: [{
        field: "authorization",
        message: "You must be logged in to continue."
      }] 
    })
  };

  return singleUpload(req, res, async (err: any) => {
    if(err){
      console.log(err);
      return res.status(500).json({
        error: err
      })
    };

    const photo = await prisma.photo.create({
      data: {
        title,
        imageUrl: req.file.location,
        author: {
          connect: { id: user.id }
        }
      }
    });

    return res.status(201).json({
      success: true,
      data: photo
    })
  }) 
}