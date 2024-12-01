import { Request , Response , NextFunction } from "express";
import jwt from "jsonwebtoken"
import User from "../model/userModel";

interface AuthRequest extends Request {
    user?:{
        username : string,
        password : string,
        role : string,
        email : string,
        id : string
    }
}

enum Role{
    Admin = "admin",
    Customer = "customer"
}

class AuthMiddleware{
    isAuthenticated(req:AuthRequest , res:Response , next:NextFunction){
        const token = req.headers.authorization
        if(!token || token == undefined) {
            res.status(404).json({
                message : "Token is not provided"
            })
            return
        }
        jwt.verify(token,process.env.SECRET_KEY as string,async(err,decoded:any) => {
            if(err) {
                res.status(400).json({
                    message : "Invaild token"
                })
            }
            else {
                try {
                    const userData = await User.findByPk(decoded.id)
                if(!userData) {
                    res.status(404).json({
                        message : "No user with this token"
                    })
                    return
                }
                req.user = userData
                next()
                } catch (error) {
                    res.status(500).json({
                        message : "Something went wrong"
                    })
                }
            }
        })
    }
    restrictTo(...roles:Role[]) {
        return (req:AuthRequest , res:Response , next:NextFunction) => {
            const userRole = req.user?.role as Role
            if(!roles.includes(userRole)) {
                res.status(403).json({
                    message : "You don't have permission"
                })
            }
            else {
                next()
            }
        }
    }
}

export default new AuthMiddleware()