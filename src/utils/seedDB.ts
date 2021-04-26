import { prisma } from '../index';

export const seedDB = async() => {
  for(let i = 0; i < 25; i++){
      await prisma.photo.create({
        data: {
          title: "Title" + i,
          imageUrl: "https://source.unsplash.com/random",
          author: {
            connect: { id: 1 }
          }
        }
      })
      await prisma.photo.create({
        data: {
          title: "Title" + i,
          imageUrl: "https://source.unsplash.com/random",
          author: {
            connect: { id: 3 }
          }
        }
      })
    }
};  
