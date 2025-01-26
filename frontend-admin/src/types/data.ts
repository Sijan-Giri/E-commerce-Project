import { Status } from "./status"

export interface UserTypes{
    id : string,
    email : string,
    username : string
}

interface CategoryTypes {
    id : string,
    categoryName : string
}

export interface Product{
    id: string,
    productName : string,
    productPrice : number,
    productDescription : string,
    productTotalStockQty : number,
    createdAt : string,
    updatedAt : string,
    UserId : string,
    CategoryId : string,
    User : UserTypes,
    Category : CategoryTypes
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
    phoneNumber : string,
    shippingAddress : string,
    totalAmount : number,
    paymentDetails:{
        paymentMethod : PaymentMethod,
        paymentStatus?:PaymentStatus,
        pidx?:string
    },
    items : OrderDetails[]
}

export interface InitialState{
    products : Product[],
    user : UserTypes[],
    order : OrderData[],
    status : Status,
    singleProduct : Product | null
}