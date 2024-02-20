const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

//.ENV
dotenv.config();

const app = express();
// const router = express.Router();
// const route = require('./routes/index.js');

app.use(cors()); //tránh lỗi
app.use(express.static("public"));
app.use(express.json()); //phản hồi ở dạng json
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set("views", "./views");
app.set('views', path.resolve(__dirname, 'views'));

var server = require("http").Server(app);

//DATABASE AUTHENTICATED
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

//CONECT SERVER
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});

// ROUTES
app.use(indexRoutes);
app.use(authRoutes);
app.use(userRoutes);


// // KHỞI TẠO KẾT NỐI PLC
// var nodes7 = require('nodes7');  
// var conn_plc = new nodes7; //PLC1
// // Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
// conn_plc.initiateConnection({port: 102, host: '10.14.85.26', rack: 0, slot: 1}, PLC_connected); 