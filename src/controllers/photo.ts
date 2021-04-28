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
      photo
    })
  }) 
};

//  **** GET ALL PHOTOS ****
export const getAllPhotos = async(req: Request, res: Response) => {
   try { 
     const photos = await prisma.photo.findMany();
     return res.status(200).json({
        success: true,
        photos
      });
   }
   catch(err) {
    console.log(err);
    return res.status(500).json({
      error: err
    })
   }
}
//  **** SEARCH ALL PHOTOS ****
export const searchAllPhotos = async(req: Request, res: Response) => {

  //take string from req, maybe req.searchString or something
   try { 
     const photos = await prisma.photo.findMany({
       where: {
         title: {
           //put whatever the request string is here
           contains: req.body.searchString
         }
       }

     });
     return res.status(200).json({
        success: true,
        photos
      });
   }
   catch(err) {
    console.log(err);
      return res.status(500).json({
      error: err
    })
   }
   
}
