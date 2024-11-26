import express,{Application,Request,Response} from "express";
const app:Application = express();

import * as dotenv from "dotenv"
dotenv.config()

app.use(express.json());

import "./database/connection"
import userRoute from "./route/userRoute"

app.use("",userRoute)

app.get("/",(req:Request,res:Response) => {
    res.send("API is running...")
})

const PORT:number = 3000

app.listen(PORT,() => {
    console.log(`Server started at ${PORT}...`)
})