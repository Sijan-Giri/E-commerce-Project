
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

export interface OrderDetails{
    quantity : number,
    productId : string
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

export interface KhaltiResponse{
    pidx : string,
    payment_url : string,
    expires_at : Date | string,
    expires_in : number,
    user_fee : number
}

export interface TransactionVerificationResponse{
    pidx : string,
    total_amount : number,
    status : TransactionStatus,
    transaction_id : string,
    fee : number,
    refunded : boolean
}

export enum TransactionStatus{
    COMPLETED = "Completed",
    PENDING = "Pending",
    INITIATED = 'Initiated',
    REFUNDED = "Refunded"
}