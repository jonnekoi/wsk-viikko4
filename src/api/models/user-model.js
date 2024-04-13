import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_users");
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.query(
      "SELECT * FROM wsk_users WHERE user_id = ?", [id]
  );
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, role, password} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, role, password];
  const [result] = await promisePool.execute(sql, params);
  return {user_id: result.insertId};
};

const getUserByUsername = async (username) => {
  const sql = `SELECT *
              FROM wsk_users 
              WHERE username = ?`;
  const [rows] = await promisePool.execute(sql, [username]);
  if (rows.length === 0){
    return false;
  }
  return rows[0];
};

export {listAllUsers, findUserById, addUser, getUserByUsername};
