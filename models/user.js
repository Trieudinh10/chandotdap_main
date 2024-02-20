const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const connection = require('../config/database');
// const mysql = require('mysql2/promise');
// // Khai báo kết nối tới MySQL
// const connection = mysql.createconnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'sql_user'
// });

// // Tạo bảng users trong MySQL nếu chưa tồn tại
// connection.query(`CREATE TABLE IF NOT EXISTS users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   admin BOOLEAN DEFAULT FALSE,
//   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// )`);

// Hàm chuyển đổi email thành chữ thường
function validateEmail(email) {
  return isEmail(email) ? email.toLowerCase() : null;
}

// Hàm tạo password hash
async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

// const User = {
//   // Hàm tạo user mới
//   createUser: async function(email, password, admin = false) {
//     email = validateEmail(email);
//     if (!email) throw new Error('Invalid email');
//     password = await hashPassword(password);
//     const [rows] = await connection.query('INSERT INTO users (email, password, admin) VALUES (?, ?, ?)', [email, password, admin]);
//     return { id: rows.insertId, email, admin };
//   },

//   // Hàm đăng nhập
//   loginUser: async function (email, password) {
//   email = validateEmail(email);
//   if (!email) throw new Error('Invalid email');
//   const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
//   if (rows.length === 0) throw new Error('User not found');
//   const user = rows[0];
//   const auth = await bcrypt.compare(password, user.password);
//   if (!auth) throw new Error('Incorrect password');
//   return { id: user.id, email: user.email, admin: user.admin };
// }
// };


// Hàm tạo user mới
async function createUser(email, password, admin = false) {
  email = validateEmail(email);
  if (!email) throw new Error('Invalid email');
  password = await hashPassword(password);
  const [rows] = await connection.query('INSERT INTO users (email, password, admin) VALUES (?, ?, ?)', [email, password, admin]);
  return { id: rows.insertId, email, admin };
}

// Hàm đăng nhậps
async function loginUser(email, password) {
  email = validateEmail(email);
  if (!email) throw new Error('Invalid email');
  const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) throw new Error('User not found');
  const user = rows[0];
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) throw new Error('Incorrect password');
  return { id: user.id, email: user.email, admin: user.admin };
}

module.exports = {
  createUser,
  loginUser
};
