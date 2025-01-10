import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState , CartItem } from "../types/cartTypes";
import { Status } from "../types/types";
import { AppDispatch } from "./store";
import { API } from "../http";

const initialState:CartState = {
    items : [],
    status : Status.LOADING
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        setItems(state:CartState,action:PayloadAction<CartItem[]>){
            state.items = action.payload
        },
        setStatus(state:CartState,action:PayloadAction<Status>){
            state.status = action.payload
        }
    }
})

export const {setItems , setStatus} = cartSlice.actions
export default cartSlice.reducer

export function addToCart() {
    return async function addToCartThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await API.post("")
        } catch (error) {
            
        }
    }
}