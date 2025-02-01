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


//     "Product": {
//         "id": "e5fedbdb-b11e-4960-b3a9-b7d8805ab928",
//         "productName": "Shafira Christian",
//         "productPrice": 142,
//         "productDescription": "Voluptas dolorem rec",
//         "productTotalStockQty": 624,
//         "productimageUrl": null,
//         "createdAt": "2025-01-31T03:35:12.000Z",
//         "updatedAt": "2025-01-31T03:35:12.000Z",
//         "UserId": "5fea248c-b11b-418d-a365-bb67bd73d548",
//         "CategoryId": "dfe0a3a1-650c-43ff-aa6a-6c06af353de5",
//         "Category": {
//             "id": "dfe0a3a1-650c-43ff-aa6a-6c06af353de5",
//             "categoryName": "Groceries",
//             "createdAt": "2025-01-31T03:30:39.000Z",
//             "updatedAt": "2025-01-31T03:30:39.000Z"
//         }
//     },
//     "Order": {
//         "id": "0db1bc91-eb4a-4ee0-bd7a-ee72e91471e1",
//         "phoneNumber": "489",
//         "shippingAddress": "Necessitatibus maxim",
//         "totalAmount": 142,
//         "orderStatus": "pending",
//         "createdAt": "2025-01-31T03:38:31.000Z",
//         "updatedAt": "2025-01-31T03:38:31.000Z",
//         "paymentId": null,
//         "userId": "e38efd5d-d80c-4a33-9968-9fc2b98a30ee",
//         "Payment": null,
//         "User": {
//             "id": "e38efd5d-d80c-4a33-9968-9fc2b98a30ee",
//             "username": "SIjan Giri",
//             "email": "sijan@gmail.com",
//             "role": "customer",
//             "password": "$2b$10$bgWV59W.z7dMJMXTKhIRQ.FjcO6zjV8nV/KftrQMtpJ00lh2QLh9W",
//             "createdAt": "2025-01-31T03:37:10.000Z",
//             "updatedAt": "2025-01-31T03:37:10.000Z"
//         }
//     }
// }
// ]
// }

export interface SingleOrder{
    id : string,
    quantity : number,
    orderId : string,
    createdAt : string,
    productId? : string,
    Product : Product,
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