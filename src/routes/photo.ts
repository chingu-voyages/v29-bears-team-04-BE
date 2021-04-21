import express from 'express';
import { addPhoto } from '../controllers/photo';
const router = express.Router({mergeParams: true});

router
  .route('/add')
  .post(addPhoto)

export default router;