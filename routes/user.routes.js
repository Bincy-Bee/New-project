const {Router} = require('express');
const { signuppage, signup, login, loginpage, chnagePass, sendMail, otppage, forreset, resestpass } = require('../controller/user.controller');
const { signField, logField } = require('../middleware/fieldCheck');
const UserRouter = Router();

UserRouter.get("/signup", signuppage);

UserRouter.post("/signup",signup);

UserRouter.get("/login", loginpage)

UserRouter.post("/login", login);

UserRouter.post("/sendmail",sendMail );

UserRouter.get("/forgotpassword", chnagePass);

UserRouter.get("/password/:otp", otppage);

UserRouter.post("/password/otp", forreset);

UserRouter.post("/reset", resestpass)

module.exports={UserRouter}