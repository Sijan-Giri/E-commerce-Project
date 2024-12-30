import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface User{
    username : string,
    password : string,
    email  : string,
    token : string
}

export enum Status{
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

interface AuthState{
    user : User,
    status : string
}

const initialState : AuthState = {
    user : {} as User,
    status : Status.LOADING
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setUser(state:AuthState,action:PayloadAction<User>) {
            state.user = action.payload
        },
        setStatus(state:AuthState,action:PayloadAction<string>) {
            state.status = action.payload;
        }
    }
})

export const {setUser , setStatus} = authSlice.actions;
export default authSlice.reducer