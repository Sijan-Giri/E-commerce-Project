import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../types/productTypes";
import { Status } from "../types/types";
import { API } from "../http";
import { AppDispatch, AppSelector } from "./store";

const initialState:ProductState = {
    product : [],
    status : Status.LOADING,
    singleProduct : null
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
        },
        setSingleProduct(state:ProductState,action:PayloadAction<Product>) {
            state.singleProduct = action.payload
        } 
    }
})

export const {setProduct , setStatus , setSingleProduct} = productSlice.actions
export default productSlice.reducer;

export function fetchProducts() {
    return async function fetchProductsThunk(dispatch:any):Promise<void> {
        try {
            dispatch(setStatus(Status.LOADING))
            const response = await API.get("/admin/product");
            if(response.status == 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setProduct(response.data.data))
            }
            else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchProduct(productId:string) {
    return async function fetchProductThunk(dispatch:AppDispatch,getState : () => AppSelector){
        const state = getState();
        const existingProduct = state.product.product.find((product) => product.id == productId);
        if(existingProduct) {
            dispatch(setSingleProduct(existingProduct));
            dispatch(setStatus(Status.SUCCESS))
        }
        else {
            try {
                dispatch(setStatus(Status.LOADING))
                const response = await API.get(`/admin/product/${productId}`);
                if(response.status == 200) {
                    dispatch(setStatus(Status.SUCCESS));
                    dispatch(setSingleProduct(response.data.data))
                }
                else {
                    dispatch(setStatus(Status.ERROR))
                }
            } catch (error) {
                dispatch(setStatus(Status.ERROR))
            } 
        }
    }
}