import e, {Request , Response} from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../model/cart";
import Product from "../model/productModel";

class cartController{
    async addToCart(req:AuthRequest,res:Response):Promise<void>{
        const UserId = req.user?.id;
        const {quantity , ProductId} = req.body;
        if(!quantity || !ProductId) {
            res.status(400).json({
                message : "Please provide quantity & productId"
            })
            return
        }
        let cartItem = await Cart.findOne({
            where : {
                ProductId,
                UserId
            }
        })
        if(cartItem) {
            cartItem.quantity += quantity,
            await cartItem.save();
        }
        else {
            cartItem = await Cart.create({
                ProductId,
                quantity,
                UserId
            })
        }
        res.status(200).json({
            message : "Product added to cart",
            data : cartItem
        })
    }

    async getMyCartItems(req:AuthRequest,res:Response):Promise<void> {
        const UserId = req.user?.id;
        const cart = await Cart.findAll({
            where : {
                UserId
            },
            include : [
                {
                    model : Product
                }
            ]
        })
        if(cart.length === 0) {
            res.status(404).json({
                message : 'No items found'
            })
        } 
        else {
            res.status(200).json({
                message : "Cart items fetched successfully",
                data : cart
            })
        }
    }
}

export default new cartController()