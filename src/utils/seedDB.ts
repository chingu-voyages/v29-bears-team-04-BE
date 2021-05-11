import { prisma } from '../index';

export const seedDB = async(i: number) => {
      await prisma.photo.create({
        data: {
          title: "Title" + i,
          imageUrl: "https://source.unsplash.com/random",
          category: "Nature",
          author: {
            connect: { id: 2 }
          }
        }
      })
      await prisma.photo.create({
        data: {
          title: "Title" + i,
          category: "Space",
          imageUrl: "https://source.unsplash.com/weekly",
          author: {
            connect: { id: 3 }
          }
        }
      })
    
};  
