import express from 'express';
import {
  getUsers,
  getUserById,
  postUser
} from '../controllers/user-controller.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares.js';

const userRouter = express.Router();

userRouter.route('/')
.get(getUsers)
.post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    validationErrors,
    postUser
);

userRouter.route('/:id').get(getUserById);

export default userRouter;
