import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../types/types";
import { ItemDetailsResponse, OrderData, OrderResponseData } from "../types/checkoutTypes";
import { AppDispatch } from "./store";
import { AuthApi } from "../http";

const initialState:OrderResponseData = {
    items : [],
    status : Status.LOADING,
    khaltiUrl : null 
}

const checkoutSlice = createSlice({
    name : "checkout",
    initialState,
    reducers : {
        setStatus(state:OrderResponseData,action:PayloadAction<Status>) {
            state.status = action.payload
        },
        setItems(state:OrderResponseData,action:PayloadAction<ItemDetailsResponse>) {
            state.items.push(action.payload)
        },
        setKhaltiUrl(state:OrderResponseData,action:PayloadAction<OrderResponseData['khaltiUrl']>) {
            state.khaltiUrl = action.payload
        }
    }
})

export const {setStatus , setItems , setKhaltiUrl} = checkoutSlice.actions;
export default checkoutSlice.reducer;

export function orderItem(data : OrderData) {
    return async function orderItemThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await AuthApi.post("/order",data);
            if(response.status == 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setItems(response.data.data));
                if(response.data.url) {
                    dispatch(setKhaltiUrl(response.data.url))
                }
                else{
                    dispatch(setKhaltiUrl(null))
                }
            }
            else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchMyOrders(id:OrderData) {
    return async function fetchMyOrdersThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await AuthApi.get("/customer/order/" + id);
            if(response.status == 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setItems(response.data.data))
            }
            else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}