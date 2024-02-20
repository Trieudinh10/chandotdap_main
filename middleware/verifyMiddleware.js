const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req, res, next) => {
      const token = req.headers.token;
  
      if (token) {
        const accessToken = token.split(" ")[1]; // Bearer 123456
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
          // verify jsonwebtoken
          if (err) {
            res.status(403).json("Token invalid");
                return;
            }
            req.user = user;
            next();
        });
    }else{
        res.status(401).json("you are not authenticated");
    }
},
verifyTokenAndAdminAuth: (req, res, next) =>{
    middlewareController.verifyToken(req, res, ()=> {
        if (req.user.id == req.params.id || req.user.admin) {
            next();
        }else{
            res.status(403).json("You're not allowed to delete")
        }
    });
} 
}
module.exports = middlewareController;