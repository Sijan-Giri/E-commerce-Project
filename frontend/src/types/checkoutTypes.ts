import { Status } from "./types"

export enum PaymentMethod{
    COD = "cod",
    KHALTI = "khalti"
}

export enum OrderStatus{
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
    items : ItemDetails[]
}

export interface OrderResponseData{
    items : ItemDetailsResponse[],
    status : Status,
    khaltiUrl : string | null,
    myOrders : MyOrdersData[]
}

export interface MyOrdersData{
    id : string,
    phoneNumber : string,
    shippingAddress : string,
    totalAmount : number,
    orderStatus : OrderStatus,
    paymentId : string,
    userId : string
}