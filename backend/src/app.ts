import express,{Application,Request,Response} from "express";
const app:Application = express();
import cors from "cors"

import * as dotenv from "dotenv"
dotenv.config()

app.use(express.json());
app.use(cors({
    origin : "*"
}))


import "./database/connection"
import userRoute from "./route/userRoute"
import adminSeeding from "./adminSeeder";
import productRoute from "./route/productRoute"
import categoryController from "./controllers/categoryController";
import categoryRoute from "./route/categoryRoute";
import cartRoute from "./route/cartRoute"
import orderRoute from "./route/orderRoute"
import { Server } from "socket.io";
import { promisify } from "util";
import jwt from "jsonwebtoken"
import User from "./model/userModel";

adminSeeding()

app.use("",userRoute)
app.use("/admin/product",productRoute)
app.use("/admin/category",categoryRoute)
app.use("/customer/cart",cartRoute)
app.use("/order",orderRoute)

app.get("/",(req:Request,res:Response) => {
    res.send("API is running...")
})

const PORT:number = 4000

const server = app.listen(PORT,() => {
    categoryController.seedCategory()
    console.log(`Server started at ${PORT}...`)
})

const io = new Server(server,{
    cors : {
        origin : ["http://localhost:5173","http://localhost:5174"]
    }
})

let onlineUsers : any = [];
const addToOnlineUsers = (socketId:string,userId : string,role : string) => {
    onlineUsers = onlineUsers.filter((user:any) => user.userId != userId);
    onlineUsers.push({socketId , userId , role})
}

io.on("connection",async(socket) => {
    console.log("Connection established");
    const {token} = socket.handshake.auth;
    if(token) {
        //@ts-ignore
        const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY);
        //@ts-ignore
        const doesUserExists = await User.findByPk(decoded.id);
        if(doesUserExists) {
            addToOnlineUsers(socket.id,doesUserExists.id,doesUserExists.role)
        }
    }
    socket.on("updateOrderStatus",({status,orderId,userId}) => {
        const findUser = onlineUsers.find((user:any) => user.userId == userId);
        if(findUser) {
            console.log(findUser)
            io.to(findUser.socketId).emit("statusUpdated",{
                status,
                orderId
            })
        } 
    })
})