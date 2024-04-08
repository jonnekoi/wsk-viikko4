import {addUser, findUserById, listAllUsers} from '../models/user-model.js';

const getUsers = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.sendStatus(201);
    res.json({message: 'User added', result});
  } else {
    res.sendStatus(400);
  }
};

export {postUser, getUserById, getUsers};
