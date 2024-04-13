import express from 'express';

import {
  postLogin,
    getMe
} from '../controllers/auth-conroller.js';
import {authenticateToken} from '../../middlewares.js';
import {postUser} from '../controllers/user-controller.js';


const authRouter = express.Router();
authRouter.route('/register').post(postUser);
authRouter.route('/login').post(postLogin);
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
