import { Status } from "./status"

export interface UserTypes{
    id : string,
    email : string,
    username : string,
    createdAt : string
}

export interface CategoryTypes {
    id : string,
    categoryName : string
}

export interface Product{
    id?: string,
    productName : string,
    productPrice : number,
    productDescription : string,
    productTotalStockQty : number,
    createdAt? : string,
    updatedAt ?: string,
    UserId? : string,
    CategoryId : string,
    User ?: UserTypes,
    Category ?: CategoryTypes
}

export enum PaymentMethod{
    COD = "cod",
    KHALTI = "khalti",
    ESEWA = "esewa"
}

export enum PaymentStatus{
    PAID = "paid",
    UNPAID = "unpaid"
}

export interface OrderDetails{
    quantity : number,
    productId : string
}

export interface OrderData{
    id : string,
   phoneNumber  : string,
    shippingAddress : string,
    totalAmount : number,
    paymentDetails:{
        paymentMethod : PaymentMethod,
        paymentStatus?:PaymentStatus,
        pidx?:string
    },
    items : OrderDetails[],
    User : UserTypes
}

export interface Category{
    categoryName : string
}

// "Order": {
//     "id": "1b51b342-8ad2-4722-be10-6c78101cafeb",
//     "phoneNumber": "9867463728",
//     "shippingAddress": "Jorpati",
//     "totalAmount": 300,
//     "orderStatus": "pending",
//     "createdAt": "2024-12-19T12:28:56.000Z",
//     "updatedAt": "2024-12-19T12:28:56.000Z",
//     "paymentId": null,
//     "userId": "d91acb43-4e68-49bd-be10-32bb71d61478",
//     "Payment": null,
//     "User": {
//         "id": "d91acb43-4e68-49bd-be10-32bb71d61478",
//         "username": "Admin",
//         "email": "admin@gmail.com",
//         "role": "admin",
//         "password": "$2b$08$fiba0TL1nGYs1UzE5yeTK.tgr3QvQ2jCBc7wRX41lmJ/Fuit44w7e",
//         "createdAt": "2024-12-16T09:40:26.000Z",
//         "updatedAt": "2024-12-16T09:40:26.000Z"

export interface SingleOrder{
    id : string,
    quantity : string,
    orderId : string,
    createdAt : string,
    Order : {
        id : string,
        phoneNumber : string,
        shippingAddress : string,
        totalAmount : number,
        orderStatus : string,
        createdAt : string
    }
    
}  

export interface InitialState{
    products : Product[],
    user : UserTypes[],
    order : OrderData[],
    status : Status,
    singleProduct : Product | null,
    category : CategoryTypes[],
    singleOrder : SingleOrder[]
}