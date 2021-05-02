import { Request, Response } from 'express';
import upload from '../utils/multer';
import { prisma } from '../index';
import { checkSessionExpired } from '../utils/checkSession';

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
      errors: {
        field: "authorization",
        message: "You must be logged in to continue."
      } 
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
        photos,
      });
   }
   catch(err) {
    console.log(err);
    return res.status(500).json({
      error: err,
      message: 'Photo retrieval failed'
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

// **** GET MY PHOTOS ****
export const getMyPhotos = async(req: Request, res: Response) => {
  if(!req.session.userId) {
    return res.status(401).json({
      success: false,
      error: {
        field: "session",
        message: "Your session has expired, please login again."
      }
    })
  };
  
  try {
    const photos = await prisma.user.findUnique({
      where: {
        id: req.session.userId
      },
      select: {
        photos: true,
        id: false,
        email: false,
        password: false,
        name: false,        
     
      }
    })
    return res.status(200).json({
      success: true,
      photos
    })
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error
    })
  }

}

// **** UPDATE PHOTO ****

//First we check if the photo exists, then we check if the user owns the photo, then we update the information
export const updatePhoto = async(req: Request, res: Response) => {
  //I wasn't logged and didn't know, why? 
  checkSessionExpired(req, res);
  const { id, title } = req.body;
  try { 
     const user = await prisma.user.update({
        where: {
          id: req.session.userId,
        },
        data: {
          photos: {
            update: {
              where: {
                id: id,
              },
              data: {
                title: title,
              },
            },
          },
        },
        //Should we return exactly what we updated here? Or just forget about that?
        select: {
          id: false,
          email: false,
          password: false,
          name: false,
          photos: {
            where: {
              id: id
            },          
          }
        }
      })
     return res.status(200).json({
        success: true,
        message: 'Photo update succeeded',
        user,
      });
   }
   catch(err) {
    console.log(err);
    return res.status(500).json({
      error: err,
      message: 'Photo update failed'
    })
   }

}