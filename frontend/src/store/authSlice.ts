import { createSlice , PayloadAction } from "@reduxjs/toolkit";
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

export function register(data:RegisterData):Promise<> {
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
            dispatch(setStatus(Status.SUCCESS));
        }
        else {
            dispatch(setStatus(Status.ERROR))
        }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}