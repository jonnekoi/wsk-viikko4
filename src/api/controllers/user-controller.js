import {addUser, findUserById, listAllUsers} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res, next) => {
  console.log(req.body);
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (!result) {
    const error = new Error("Invalid or missing fields");
    error.status = 400;
    next(error);
  } else {
    res.status(201).json({ message: "New user added"});
  }
};

export {postUser, getUserById, getUsers};
