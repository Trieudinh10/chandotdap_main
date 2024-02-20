const connection = require("../config/database")

const getAllUser = async() => {
    let [results, fields] = await connection.query('SELECT * FROM users');
    console.log( 'req.params:', results )
    return results;
}

const getUserById = async(userId) => {
    let [results, fields] = await connection.query('SELECT * FROM users where id = ?', [userId]);
        console.log( 'req.params:', results )
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

const  upDateUserById = async(email, password, userId) => {
    let [results, fields] = await connection.query(
        `UPDATE users 
        SET email = ?, password = ?
        WHERE id = ?
        `,[email, password, userId] 
    );
}

const deleteUserById = async(id) => {
    let [results, fields] = await connection.query(
        `DELETE FROM users WHERE  id = ?`,[id]
    );
}

// const getAdmin = async (admin) => {
//     try {
//         // Thực hiện truy vấn để lấy thông tin admin từ cơ sở dữ liệu
//         const [results, fields] = await connection.query(
//             `SELECT admin FROM users WHERE admin = ?;`,
//             [admin]
//         );
        
//         // Trả về giá trị admin từ kết quả truy vấn
//         if (results.length > 0) {
//             return results[0].admin;
//         } else {
//             return null; // hoặc giá trị mặc định khác phù hợp
//         }
//     } catch (error) {
//         console.error("Error retrieving admin:", error);
//         throw error; // Ném lỗi để được xử lý ở nơi gọi
//     }
// };


module.exports = {
    getAllUser,
    getUserById,
    upDateUserById,
    deleteUserById,
    // getAdmin
}