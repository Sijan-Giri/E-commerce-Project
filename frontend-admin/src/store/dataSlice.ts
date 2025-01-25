import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, OrderData, Product, UserTypes } from "../types/data";
import { Status } from "../types/status";

const initialState:InitialState = {
    products : [],
    order : [],
    user : [],
    status : Status.LOADING
}

const dataSlice = createSlice({
    name : "data",
    initialState,
    reducers : {
        setProduct(state:InitialState,action:PayloadAction<Product[]>) {
            state.products = action.payload
        },
        setOrder(state:InitialState,action:PayloadAction<OrderData[]>) {
            state.order = action.payload
        },
        setUser(state:InitialState,action:PayloadAction<UserTypes[]>) {
            state.user = action.payload
        },
        setStatus(state:InitialState,action:PayloadAction<Status>) {
            state.status = action.payload
        }
    }
})

export const {setProduct , setOrder , setUser , setStatus} = dataSlice.actions
export default dataSlice.reducer