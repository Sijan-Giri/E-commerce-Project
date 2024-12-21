import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { KhaltiResponse, OrderData, PaymentMethod, TransactionStatus, TransactionVerificationResponse } from "../types/orderTypes";
import Order from "../model/order";
import Payment from "../model/payment";
import OrderDetails from "../model/orderDetails";
import axios from "axios";

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
}

export default new OrderController();