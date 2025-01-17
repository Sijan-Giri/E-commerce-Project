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

export interface OrderData{
    phoneNumber : string,
    shippingAddress : string,
    totalAmount : number,
    paymentDetails : {
        paymentMethod : PaymentMethod
    },
    items : ItemDetails[]
}

export interface OrderResponseData{
    items : ItemDetailsResponse[],
    status : Status,
    khaltiUrl : string | null
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