import { Router } from 'express'
import User from '../models/user.model.js'

const userRouter = Router();


userRouter.route('/register').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({ username, password })
    newUser.save()
        .then((saveRes) => res.json({ status: true, message: "User Created !" }))
        .catch(err => res.json({ status: false, message: "User already exists !", log: err.message }))
})

userRouter.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.find({ username: username, password: password })
        .then((user) => { res.json({ status: true, message: "User found !", token: user[0].id, loggedIn: true }) })
        .catch(err => res.json({ status: false, message: "User not found !", log: "Please check username or password", loggedIn: false }));
})



export default userRouter;