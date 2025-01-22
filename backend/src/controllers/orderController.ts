import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { KhaltiResponse, OrderData, OrderStatus, PaymentMethod, PaymentStatus, TransactionStatus, TransactionVerificationResponse } from "../types/orderTypes";
import Order from "../model/order";
import Payment from "../model/payment";
import OrderDetails from "../model/orderDetails";
import axios from "axios";
import Product from "../model/productModel";
import Cart from "../model/cart";
import User from "../model/userModel";
import Category from "../model/category";

export class ExtendedOrder extends Order{
    declare paymentId : string | null
}

class OrderController{
    async createOrder(req:AuthRequest,res:Response):Promise<void> {
        const userId = req.user?.id;
         const {phoneNumber , shippingAddress , totalAmount , paymentDetails , items}:OrderData = req.body;
        if(!phoneNumber || !shippingAddress || !totalAmount || !paymentDetails || !paymentDetails.paymentMethod || items.length == 0 || !items) {
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

        let orderResponseData;

        for(var i = 0 ; i<items.length ; i++) {
            orderResponseData = await OrderDetails.create({
                productId : items[i].productId,
                quantity : items[i].quantity,
                orderId : orderData.id
            })
            await Cart.destroy({
                where : {
                    productId : items[i].productId,
                    userId : userId
                }
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
                message : "Order placed successfully",
                data : orderResponseData
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
        const orderDetails = await OrderDetails.findOne({
            where : {
                orderId
            },
            include : [{
                model : Product,
                include : [
                    {
                        model : Category
                    }
                ]
            },{
                model : Order,
                include : [
                    {
                        model : Payment
                    },
                    {
                        model : User
                    }
                ]
            }]
        }) 
        if(orderDetails) {
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
        const order:any = await Order.findOne({
            where : {
                userId,
                id : orderId
            }
        })
        if(order) {
            if(order.orderStatus === OrderStatus.ONTHEWAY || order.orderStatus === OrderStatus.PREPARATION) {
                res.status(400).json({
                    message : "You cannot cancel the order when it is in preparation & onTheWay state"
                })
                return 
            }
            const updatedOrder = await Order.update({orderStatus : OrderStatus.CANCELLED},{
                where : {
                    userId,
                    id : orderId
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

    async changeOrderStatus(req:AuthRequest,res:Response):Promise<void>{
        const orderId = req.params.id;
        if(!orderId) {
            res.status(400).json({
                message : "Please provide order id"
            })
        }
        const orderStatus:OrderStatus = req.body.orderStatus;

        if(!orderStatus) {
            res.status(400).json({
                message : "Please provide order status"
            })
            return
        }

        const orderStatuses = await Order.update({
            orderStatus : orderStatus
        },{
            where : {
                id : orderId
            }
        })
        res.status(200).json({
            message : "OrderStatus updated successfully",
            data : orderStatuses
        })
    }

    async changePaymentStatus(req:AuthRequest,res:Response):Promise<void>{
        const orderId = req.params.id;
        const paymentStatus:PaymentStatus = req.body.paymentStatus;
        if(!orderId) {
            res.status(400).json({
                message : "Please provide order id"
            })
            return
        }
        if(!paymentStatus) {
            res.status(400).json({
                message : "Please provide paymentStatus"
            })
            return
        }
        const order = await Order.findByPk(orderId);
        const extendedOrder:ExtendedOrder = order as ExtendedOrder
        await Order.update({
            paymentStatus : paymentStatus
        },{
            where : {
                id : extendedOrder.paymentId
            }
        })
        res.status(200).json({
            message : "Payment Status updated successfully"
        })
    }
    async deleteOrder(req:AuthRequest,res:Response):Promise<void>{
        const orderId = req.params.id;
        if(!orderId) {
            res.status(400).json({
                message : "Please provide order id"
            })
            return
        }
        const order = await Order.findByPk(orderId);
        const extendedOrder:ExtendedOrder = order as ExtendedOrder

        if(order) {
            await Order.destroy({
                where : {
                    id : orderId
                }
            })
            await OrderDetails.destroy({
                where : {
                    orderId
                }
            })
            await Payment.destroy({
                where : {
                    id : extendedOrder.paymentId
                }
            })
            res.status(200).json({
                message : "Order deleted successfully"
            })
        }
        else {
            res.status(404).json({
                message : "Orders not found!!"
            })
        }
    }
}

export default new OrderController();