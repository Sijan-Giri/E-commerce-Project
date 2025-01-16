import { Status } from "./types"

export enum PaymentMethod{
    COD = "cod",
    KHALTI = "khalti"
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