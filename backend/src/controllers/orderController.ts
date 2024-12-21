import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { KhaltiResponse, OrderData, OrderStatus, PaymentMethod, TransactionStatus, TransactionVerificationResponse } from "../types/orderTypes";
import Order from "../model/order";
import Payment from "../model/payment";
import OrderDetails from "../model/orderDetails";
import axios from "axios";
import Product from "../model/productModel";

class OrderController{
    async createOrder(req:AuthRequest,res:Response):Promise<void> {
        const userId = req.user?.id;
         const {phoneNumber , shippingAddress , totalAmount , paymentDetails , items}:OrderData = req.body;
        if(!phoneNumber || !shippingAddress || !totalAmount || !paymentDetails || !paymentDetails.paymentMethod || items.length == 0) {
            res.status(400).json({
                message : "Please provide phoneNumber , shippingAddress , totalAmount , paymentDetails , items"
            })
            return
        }
        const orderData = await Order.create({
            userId,
            phoneNumber,
            totalAmount,
            shippingAddress,
            paymentDetails
        })

        const paymentData = await Payment.create({
            paymentMethod : paymentDetails.paymentMethod
        })

        for(var i = 0 ; i<items.length ; i++) {
            await OrderDetails.create({
                productId : items[i].productId,
                quantity : items[i].quantity,
                orderId : orderData.id
            })
        }
        if(paymentDetails.paymentMethod === PaymentMethod.KHALTI) {
            const data = {
                return_url : "http://localhost:4000/success",
                website_url : "http://localhost:4000/",
                amount : totalAmount * 100,
                purchase_order_id : orderData.id,
                purchase_order_name : "orderName_" + orderData.id
            }

            const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
                headers : {
                    "Authorization" : "key aacb5cd4c70f4cac9f8b252fdf2d8e46"
                }
            })
            const khaltiResponse:KhaltiResponse = response.data;
            paymentData.pidx = khaltiResponse.pidx;
            paymentData.save();
            res.status(200).json({
                message : "Order placed successfully",
                url : khaltiResponse.payment_url
            })
        }
        else {
            res.status(200).json({
                message : "Order placed successfully"
            })
        }
    }

    async verifyTransaction(req:AuthRequest , res:Response):Promise<void>{
        const {pidx} = req.body;
        const userId = req.user?.id;
        if(!pidx) {
            res.status(400).json({
                message : "Please provide pidx"
            })
            return
        }
        const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx},{
            headers : {
                "Authorization" : "key aacb5cd4c70f4cac9f8b252fdf2d8e46"
            }
        })
        const data:TransactionVerificationResponse = response.data;
        console.log(data.status)
        if(data.status === TransactionStatus.COMPLETED) {
            await Payment.update({paymentStatus : "paid"},{
                where : {
                    pidx : pidx
                }
            })
            res.status(200).json({
                message : "Payment Verified successfully"
            })
        }
        else {
            res.status(400).json({
                message : "Payment not verified"
            })
        }
    }

    async fetchMyOrders(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id;
        const orders = await Order.findAll({
            where : {
                userId
            },
            include : [
                {
                    model : Payment
                }
            ]
        })
        if(orders.length > 0) {
            res.status(200).json({
                message : "Orders fetched successfully",
                data : orders
            })
        }
        else {
            res.status(404).json({
                message : "You haven't ordered anything yet..."
            })
        }
    }
    async fetchOrderDetails(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id;
        const orderId = req.params.id;

        if(!orderId) {
            res.status(400).json({
                message : "Please provide orderId"
            })
        }
        const orderDetails = await OrderDetails.findAll({
            where : {
                userId,
                orderId
            },
            include : [{
                model : Product
            }]
        }) 
        if(orderDetails.length > 0) {
            res.status(200).json({
                message : "Orders details fetched successfully",
                data : orderDetails
            })
        }
        else {
            res.status(404).json({
                message : "You haven't ordered anything yet..."
            })
        }
    }
    async cancelMyOrder(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id;
        const orderId = req.params.id;
        if(!orderId) {
            res.status(400).json({
                message : "Please provide order id"
            })
            return
        }
        const order:any = await Order.findAll({
            where : {
                userId,
                orderId
            }
        })
        if(order.length > 0) {
            if(order.orderStatus === OrderStatus.ONTHEWAY || OrderStatus.PREPARATION) {
                res.status(400).json({
                    message : "You cannot cancel the order when it is in preparation & onTheWay state"
                })
                return 
            }
            const updatedOrder = await Order.update({orderStatus : OrderStatus.CANCELLED},{
                where : {
                    userId,
                    orderId
                }
            })
            res.status(200).json({
                message : "Order cancelled successfully",
                data : updatedOrder
            })
        }
        else {
            res.status(404).json({
                message : "No orders found!"
            })
        }
    }
}

export default new OrderController();