import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../types/types";
import { ItemDetailsResponse, MyOrdersData, OrderData, OrderDetails, OrderResponseData } from "../types/checkoutTypes";
import { AppDispatch } from "./store";
import { AuthApi } from "../http";

const initialState:OrderResponseData = {
    items : [],
    status : Status.LOADING,
    khaltiUrl : null,
    myOrders : [],
    orderDetails : []
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
        },
        setMyOrders(state:OrderResponseData,action:PayloadAction<MyOrdersData[]>) {
            state.myOrders = action.payload
        },
        setMyOrderDetails(state:OrderResponseData,action:PayloadAction<OrderDetails[]>){
            state.orderDetails = action.payload
        },
        setUpdateOrderStatus(state:OrderResponseData,action:PayloadAction<{status:string,orderId:string}>) {
            const status = action.payload.status
            const orderId = action.payload.orderId
            state.myOrders.map((order => order.id))
        }
    }
})

export const {setStatus , setItems , setKhaltiUrl , setMyOrders , setMyOrderDetails} = checkoutSlice.actions;
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

export function fetchMyOrders() {
    return async function fetchMyOrdersThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await AuthApi.get("/order/customer/");
            if(response.status == 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setMyOrders(response.data.data))
            }
            else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchMyOrderDetails(id:string) {
    return async function fetchMyOrderDetailsThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await AuthApi.get(`/order/customer/${id}`);
            if(response.status == 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setMyOrderDetails(response.data.data))
            }
            else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function updateOrderStatusInStore(data:any) {
    return async function updateOrderStatusInStoreThunk(dispatch:AppDispatch) {
        
    }
}