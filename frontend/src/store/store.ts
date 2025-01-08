import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import productSlice from "./productSlice"


const store = configureStore({
    reducer : {
        auth : authSlice,
        product : productSlice
    }
})

export default store

export type AppDispatch = typeof store.dispatch;
export type AppSelector = ReturnType<typeof store.getState>