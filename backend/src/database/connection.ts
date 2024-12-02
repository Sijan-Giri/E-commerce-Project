import {Sequelize} from "sequelize-typescript"
import User from "../model/userModel"
import Product from "../model/productModel"

const sequelize = new Sequelize({
    database : process.env.DB_NAME,
    dialect : "mysql",
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    port : Number(process.env.DB_PORT),
    models : [__dirname + "/../model"]
})

sequelize.authenticate()
.then(() => {
    console.log("Database connected successfully")
})
.catch((err) => {
    console.log("Something went wrong!",err)
})

sequelize.sync({force : false}).then(() => {
    console.log("Synced !!")
})

User.hasMany(Product);
Product.belongsTo(User)

export default sequelize