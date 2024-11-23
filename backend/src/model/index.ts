import {Sequelize , DataTypes} from "sequelize"
import dbConfig from "../config/dbConfig"

const sequelize = new Sequelize(dbConfig.db,dbConfig.password,dbConfig.username,{
    host : dbConfig.host,
    port : 3306,
    dialect : dbConfig.dialect,
    pool : {
        acquire : dbConfig.pool.acquire,
        min : dbConfig.pool.min,
        max : dbConfig.pool.max,
        idle : dbConfig.pool.idle
    }
})

sequelize
.authenticate()
.then(() => {
    console.log("Database connected successfully")
})
.catch((err) => {
    console.log("Something went wrong!",err)
})

const db:any = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.sequelize.sync({force : false}).then(() => {
    console.log("Yes migrated")
})

export default db;