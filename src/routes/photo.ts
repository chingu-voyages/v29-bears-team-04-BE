import express from 'express';
import { addPhoto, getAllPhotos } from '../controllers/photo';
const router = express.Router({mergeParams: true});

router
  .route('/add')
  .post(addPhoto)

router
  .route('/')
  .get(getAllPhotos)

export default router;