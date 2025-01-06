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

app.listen(PORT,() => {
    categoryController.seedCategory()
    console.log(`Server started at ${PORT}...`)
})