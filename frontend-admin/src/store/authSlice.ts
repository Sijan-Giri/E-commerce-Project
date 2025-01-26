import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../types/status";
import { API } from "../http";

interface RegisterData{
    username : string,
    email : string,
    password : string
}

interface LoginData{
    email : string,
    password : string
}

interface User{
    username : string,
    password : string,
    email  : string,
    token : string
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
        setStatus(state:AuthState,action:PayloadAction<Status>) {
            state.status = action.payload;
        },
        setToken(state:AuthState,action:PayloadAction<string>) {
            state.user.token = action.payload
        } 
    }
})

export const {setUser , setStatus , setToken} = authSlice.actions;
export default authSlice.reducer

export function register(data:RegisterData) {
    return async function registerThunk(dispatch:any):Promise<void> {
        try {
            const response = await API.post("/register",data);
        if(response.status === 200) {
            dispatch(setStatus(Status.SUCCESS));
            dispatch(setUser(response.data.data))
        }
        else {
            dispatch(setStatus(Status.ERROR))
        }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function login(data:LoginData){
    return async function loginThunk(dispatch:any) {
        try {
            const response = await API.post("http://localhost:4000/login",data);
        if(response.status === 200) {
            const token = response.data.token
            dispatch(setStatus(Status.SUCCESS));
            dispatch(setToken(response.data.token));
            localStorage.setItem("token",token)
        }
        else {
            dispatch(setStatus(Status.ERROR))
        }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}