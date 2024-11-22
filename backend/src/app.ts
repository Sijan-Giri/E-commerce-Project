import express,{Application,Request,Response} from "express";
const app:Application = express();

app.get("/",(req:Request,res:Response) => {
    res.send("API is running...")
})

const PORT:number = 3000

app.listen(PORT,() => {
    console.log(`Server started at ${PORT}...`)
})