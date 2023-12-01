const {Router} = require('express');
const { signuppage, signup, login, loginpage } = require('../controller/user.controller');
const UserRouter = Router();

UserRouter.get("/signup", signuppage);

UserRouter.post("/signup",signup);

UserRouter.get("/login", loginpage)

UserRouter.post("/login", login)

module.exports={UserRouter}