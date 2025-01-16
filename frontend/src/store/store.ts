import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"
import checkoutSlice from "./checkoutSlice"


const store = configureStore({
    reducer : {
        auth : authSlice,
        product : productSlice,
        cart : cartSlice,
        checkout : checkoutSlice
    }
})

export default store

export type AppDispatch = typeof store.dispatch;
export type AppSelector = ReturnType<typeof store.getState>