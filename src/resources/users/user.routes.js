import express from 'express';
import userController from './user.controller.js';
const router = express.Router();

const UserController = new userController();
router.post('/register', UserController.newUserRegister);
router.post('/login', UserController.userLogin);

export default router;