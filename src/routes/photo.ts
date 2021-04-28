import express from 'express';
import { addPhoto, getAllPhotos, searchAllPhotos } from '../controllers/photo';
const router = express.Router({mergeParams: true});

router
  .route('/add')
  .post(addPhoto)

router
  .route('/')
  .get(getAllPhotos)

router
  .route('/searchPhotos')
  .post(searchAllPhotos)

export default router;