import express from "express"
import jwt from "jsonwebtoken"
import assert from "node:assert"
import bcrypt from "bcryptjs"
import { User } from "../model/user.mjs"
import bodyParser from "body-parser"
const authRouter = express.Router()
authRouter.use(bodyParser.json())
authRouter.post('/signin', async  (req,res)=>{
    try{
        const validUser = await User.findOne({name : req.body.name})
        if(!validUser){
            throw new Error('invalid username')
        }
        const validPass = await bcrypt.compare(req.body.password, validUser.password)
        if(!validPass){
            throw new Error('invalid password')
        }
        const token = jwt.sign({_id: validUser._id}, process.env.TOKEN_KEY,{expiresIn: "23h"})
        res.json({token : token})
    }
    catch(err){
        res.status(401).send(err.message)
    }

})
authRouter.post('/signup', async (req,res)=>{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{
        assert.match(req.body.password,/^[a-zA-Z0-9]{3,30}$/,"invalid password")
        const error = user.validateSync()
        const savedUser = await user.save()
        const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_KEY, {expiresIn: "23h"})
        res.json({token : token})
    }
    catch(err){
        res.status(401).send(err.message)
    }
})
export {authRouter}