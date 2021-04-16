import express from 'express';
import { registerUser, getAllUsers } from '../controllers/users';
const router = express.Router({mergeParams: true});

router
  .route('/')
  .post(registerUser)
  .get(getAllUsers)

export default router;