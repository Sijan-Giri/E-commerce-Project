import { Status } from "./types"

interface UserTypes{
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

export interface ProductState{
    product : Product[],
    status : Status,
    singleProduct : Product | null
}
