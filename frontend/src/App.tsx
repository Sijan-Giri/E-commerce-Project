import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Register from './pages/auth/register/Register'
import Login from './pages/auth/login/Login'
import CardDetail from './globals/components/cardDetail/CardDetail'
import Cart from './globals/components/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import MyOrders from './pages/orders/MyOrders'
import MyOrdersDetails from './pages/orders/MyOrdersDetails'
import {io} from "socket.io-client"

export const socket = io("http://localhost:4000",{
  auth : {
    token : localStorage.getItem("token")
  }
})

function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='register' element={<Register />} />
    <Route path='login' element={<Login />} />
    <Route path='/cardDetails/:id' element={<CardDetail />}/>
    <Route path="/cart" element={<Cart />}/>
    <Route path="/checkout" element={<Checkout />} />
    <Route path='/myOrders' element={<MyOrders />}/>
    <Route path='/myOrders/:id' element={<MyOrdersDetails />}/>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
