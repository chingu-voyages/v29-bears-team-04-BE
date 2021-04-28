import express from 'express';
import { addPhoto, getAllPhotos, searchAllPhotos, getMyPhotos } from '../controllers/photo';
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

router
  .route('/getMyPhotos')
  .post(getMyPhotos)


export default router;