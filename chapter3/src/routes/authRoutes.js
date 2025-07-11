//define all our endpoints related to authentication

import express, { application } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' //can create token alphanumeric key associate with user
import db from '../db.js' //import db connection can do because we exported it in db.js


const router = express.Router()

//register user endpoint /auth/register
router.post('/register', (req, res) => {
    const {username, password} = req.body //get body of request


    //we are encrypting the password now
    const hashedPassword = bcrypt.hashSync(password, 8)

    //save new user and hashedpass to database
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)
        //we have a user and want to add a todo for them

        const defaultTodo = 'Hello, add the first todo'
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        //create a token for the user
                
        const token = jwt.sign({ id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24hrs'})
        res.json({token})
    }
    catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }



})


router.post('/login', (req, res) => {
    //get email and look up pass w email associated w it, but get it is encrypted so we cant compare to one
    //user put to login, so we need to one way encrypt password

    const { username, password } = req.body

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        // if we cannot find a user associated with that username, return out from the function
        if (!user) { return res.status(404).send({ message: "User not found" }) }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if the password does not match, return out of the function
        if (!passwordIsValid) { return res.status(401).send({ message: "Invalid password" }) }
        console.log(user)

        // then we have a successful authentication
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})






export default router