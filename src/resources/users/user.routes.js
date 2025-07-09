import express from 'express';
import userController from './user.controller.js';
import { writeLog } from '../../utils.js';
const router = express.Router();

const UserController = new userController();

writeLog("---------Inside user routes--------");
router.post('/register', UserController.newUserRegister);
router.post('/login', UserController.userLogin);

export default router;