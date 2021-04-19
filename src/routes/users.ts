import express from 'express';
import { registerUser, login } from '../controllers/users';
const router = express.Router({mergeParams: true});

router
  .route('/register')
  .post(registerUser)

router
  .route('/login')
  .post(login)

export default router;