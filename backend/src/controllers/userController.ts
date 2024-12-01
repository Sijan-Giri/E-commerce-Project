import { Request,Response } from "express";
import User from "../model/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AuthController{
    public static async registerUser(req:Request,res:Response):Promise<void>{
        try {
            const {username , email , password , role} = req.body;
        if(!username || !email || !password) {
            res.status(400).json({
                message : "Please provide username , email , password"
            })
            return
        }
        const [userExists] = await User.findAll({
            where : {
                email : email
            }
        })
        if(userExists) {
            res.status(400).json({
                message : "User with this email already exists"
            })
            return
        }
        await User.create({
            username,
            email,
            password : bcrypt.hashSync(password,10),
            role
        })
        res.status(200).json({
            message : "User registered successfully"
        })
        } catch (error:any) {
            res.status(500).json({
                message : error.message
            })
        }
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
        const isMatched = bcrypt.compareSync(password,validateUser.password)
        if(!isMatched) {
            res.status(400).json({
                message : "Invalid password"
            })
            return
        }
        const token = jwt.sign({id : validateUser.id},process.env.SECRET_KEY as string,{
            expiresIn : "30d"
        })
        res.status(200).json({
            message : "User logged in successfully",
            token : token
        })
    }
}

export default AuthController