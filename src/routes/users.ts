import express from 'express';
import { registerUser, login, logout, me, getAllUsers, updateUser, deleteUser } from '../controllers/users';
const router = express.Router({mergeParams: true});

router
  .route('/')
  .get(getAllUsers)

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

router
  .route('/update')
  .post(updateUser)

router
  .route('/delete')
  .post(deleteUser)

export default router;