// const connection = require('../config/database')
const {getAllUser, getUserById, upDateUserById, deleteUserById } = require('../service/CRUD')

const getHomepage = async(req, res) => {
let results = await getAllUser();
  return res.render('user', {listUser: results});
}

const getUpdatePage = async(req, res) => {
  const userId = req.params.id;
  // console.log( 'req.params:', req.params,userId )
  let user = await getUserById(userId);
  res.render('update_user.ejs', {userEdit : user})
}

const postUpdateuser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let userId = req.body.userId;

  await upDateUserById(email, password, userId);
  res.redirect('/user');
}

const postDeleteuser = async(req, res) => {
  const userId = req.params.id;
// console.log( 'req.params:', req.params,userId )
let user = await getUserById(userId);
res.render('delete_user.ejs', {userEdit : user});
//  res.send('deleteuser');
}

const postRemoveuser = async(req,res) => {
  const id = req.body.userId
  await deleteUserById(id)
  res.redirect('/')
}


module.exports = {
    getHomepage,
    postDeleteuser,
    postRemoveuser,
    getUpdatePage,
    postUpdateuser
}

