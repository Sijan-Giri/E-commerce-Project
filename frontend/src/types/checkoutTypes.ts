import { Product } from "./productTypes"
import { Status } from "./types"

export enum PaymentMethod{
    COD = "cod",
    KHALTI = "khalti"
}

export enum OrderStatus{
    ALL = "all",
    PENDING = "pending",
    DELIVERED = "delivered",
    ONTHEWAY = "onTheWay",
    CANCELLED = "cancelled",
    PREPARATION = "preparation"
}

export interface ItemDetails{
    productId : string,
    quantity : number
}

export interface ItemDetailsResponse extends ItemDetails{
    orderId : string
}

interface Payment {
    paymentMethod : PaymentMethod
}

enum PaymentStatus{
    PAID = "paid",
    UNPAID = "unpaid",
    PENDING = "pending"
}

export interface OrderPaymentData extends Payment{
    paymentStatus : PaymentStatus
}

export interface OrderData{
    phoneNumber : string,
    shippingAddress : string,
    totalAmount : number,
    paymentDetails : Payment,
    items : ItemDetails[],
    createdAt : string
}

export interface OrderResponseData{
    items : ItemDetailsResponse[],
    status : Status,
    khaltiUrl : string | null,
    myOrders : MyOrdersData[],
    orderDetails : OrderDetails[]
}

export interface MyOrdersData{
    id : string,
    phoneNumber : string,
    shippingAddress : string,
    totalAmount : number,
    orderStatus : OrderStatus,
    paymentId : string,
    userId : string,
    createdAt : string
}

export interface OrderDetails{
    id : string,
    quantity : string,
    orderId : string,
    Product : Product,
    Order : MyOrdersData,
    createdAt : string
}