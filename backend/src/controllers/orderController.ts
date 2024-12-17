import { Request , Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { OrderData, PaymentMethod } from "../types/orderTypes";
import Order from "../model/order";
import Payment from "../model/payment";
import OrderDetails from "../model/orderDetails";

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
            paymentDetails
        })

        const payment = await Payment.create({
            paymentMethod : paymentDetails.paymentMethod
        })

        for(var i = 0 ; i<items.length ; i++) {
            await OrderDetails.create({
                productId : items[0].productId,
                quantity : items[i].quantity,
                orderId : orderData.id
            })
        }
        if(paymentDetails.paymentMethod === PaymentMethod.KHALTI) {
            
        }
        else {
            res.status(200).json({
                message : "Order placed successfully"
            })
        }
    }
}

export default new OrderController();