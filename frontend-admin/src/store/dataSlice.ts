import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryTypes, InitialState, OrderData, Product, UserTypes } from "../types/data";
import { Status } from "../types/status";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";

const initialState:InitialState = {
    products : [],
    order : [],
    user : [],
    category : [],
    status : Status.LOADING,
    singleProduct : null
}

interface DeleteProduct{
    productId : string
}

interface DeleteUser{
    userId : string
}

interface DeleteOrder{
    orderId : string
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
        },
        setSingleProduct(state:InitialState,action:PayloadAction<Product>) {
            state.singleProduct = action.payload
        },
        setDeleteOrder(state:InitialState,action:PayloadAction<DeleteOrder>) {
            const index = state.order?.findIndex((item) => item?.id == action.payload.orderId);
            state.order?.splice(index,1)
        },
        setDeleteProduct(state:InitialState,action:PayloadAction<DeleteProduct>) {
            const index = state.products.findIndex((product) => product?.id == action.payload.productId);
            state.products.splice(index,1)
        },
        setDeleteUser(state:InitialState,action:PayloadAction<DeleteUser>) {
            const index = state.user.findIndex((item) => item?.id == action.payload.userId);
            state.user?.splice(index,1)
        },
        setCategory(state:InitialState,action:PayloadAction<CategoryTypes[]>) {
            state.category = action.payload
        }
    }
})

export const {setProduct , setOrder , setUser , setStatus , setSingleProduct , setDeleteProduct , setDeleteUser , setDeleteOrder , setCategory} = dataSlice.actions;
export default dataSlice.reducer;

export function fetchProducts() {
    return async function fetchProductsThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.get("/admin/product");
            if(response.status == 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setProduct(response.data.data))
            }else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchOrders(){
    return async function fetchOrdersThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.get("/order");
            if(response.status == 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setOrder(response.data.data))
            }
            else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchUsers() {
    return async function fetchUsersThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.get("/user");
            if(response.status == 200) {
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

export function addProduct(data:Product) {
    return async function addProductThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.post("/admin/product",data);
            if(response.status == 200) {
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

export function deleteProduct(id:string) {
    return async function deleteProductThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/admin/product/${id}`);
            if(response.status == 200) {
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

export function singleProduct(id:string) {
    return async function singleProductThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.get(`/admin/product/${id}`);
            if(response.status == 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setSingleProduct(response.data.data));
            }
            else {
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function deleteOrder(id:string) {
    return async function deleteOrderThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/order/admin/${id}`);
            if(response.status == 200) {
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

export function deleteUser(userId:string) {
    return async function deleteUserThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/user/${userId}`);
            if(response.status == 200) {
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

export function fetchCategory() {
    return async function fetchCategoryThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
              const response = await APIAuthenticated.get("/admin/category");
              if(response.status == 200) {
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setCategory(response.data.data))
              }
              else {
                dispatch(setStatus(Status.ERROR))
              }
            } catch (error) {
              dispatch(setStatus(Status.ERROR))
            }
    }
}

export function addCategory(data:Category) {
    return async function addCategoryThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.post("/admin/category",data);
            if(response.status == 200) {
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