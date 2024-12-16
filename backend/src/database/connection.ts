import {Sequelize} from "sequelize-typescript"
import User from "../model/userModel"
import Product from "../model/productModel"
import Category from "../model/category"
import Cart from "../model/cart"
import Order from "../model/order"
import OrderDetails from "../model/orderDetails"
import Payment from "../model/payment"

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
Product.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category)

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

Order.hasMany(OrderDetails,{foreignKey : "orderId"});
OrderDetails.belongsTo(Order,{foreignKey : "orderId"});

Product.hasMany(OrderDetails,{foreignKey : "productId"});
OrderDetails.belongsTo(Product,{foreignKey : 'productId'});

Payment.hasOne(Order,{foreignKey : "paymentId"});
Order.belongsTo(Payment,{foreignKey : "paymentId"});

export default sequelize