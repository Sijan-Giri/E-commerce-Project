import { Request,Response } from "express";
import User from "../model/userModel";
import bcrypt from "bcrypt"

class AuthController{
    public static async registerUser(req:Request,res:Response):Promise<void>{
        const {username , email , password} = req.body;
        if(!username || !email || !password) {
            res.status(400).json({
                message : "Please provide username , email , password"
            })
            return
        }
        await User.create({
            username,
            email,
            password : bcrypt.hashSync(password,10)
        })
        res.status(200).json({
            message : "User registered successfully"
        })
    }

    public static async loginUser(req:Request,res:Response):Promise<void>{
        const {email , password} = req.body;
        if(!email || !password) {
            res.status(400).json({
                message : "Please provide email & password"
            })
            return
        }
        const [validateUser] = await User.findAll({
            where : {
                email : email
            }
        })
        if(!validateUser) {
            res.status(404).json({
                message : "User not found with this email"
            })
            return
        }
        console.log(validateUser)
        const isMatched = bcrypt.compareSync(password,validateUser.password)
        if(!isMatched) {
            res.status(400).json({
                message : "Invalid password"
            })
            return
        }
        res.status(200).json({
            message : "User logged in successfully"
        })
    }
}

export default AuthController