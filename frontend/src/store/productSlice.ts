import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../types/productTypes";
import { Status } from "../types/types";

const initialState:ProductState = {
    product : [],
    status : Status.LOADING
}

const productSlice = createSlice({
    name : "product",
    initialState ,
    reducers : {
        setProduct(state:ProductState,action:PayloadAction<Product[]>) {
            state.product = action.payload
        },
        setStatus(state:ProductState,action:PayloadAction<Status>){
            state.status = action.payload
        } 
    }
})

export const {setProduct , setStatus} = productSlice.actions
export default productSlice.reducer