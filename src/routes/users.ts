import express from 'express';
import { registerUser, login, logout, me } from '../controllers/users';
const router = express.Router({mergeParams: true});

router
  .route('/register')
  .post(registerUser)

router
  .route('/login')
  .post(login)

router 
  .route('/logout')
  .post(logout)

router
  .route('/me')
  .get(me)

export default router;