import e, {Request , Response} from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../model/cart";
import Product from "../model/productModel";
import Category from "../model/category";

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
        const data = await Cart.findAll({
            where : {
                UserId
            }
        })
        res.status(200).json({
            message : "Product added to cart",
            data
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
                    model : Product,
                    include : [
                        {
                            model : Category
                        }
                    ]
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

    async deleteMyCartItems(req:AuthRequest,res:Response):Promise<void> {
        const UserId = req.user?.id;
        const {productId} = req.params;
        const productExists = await Product.findByPk(productId)
        if(!productExists) {
            res.status(404).json({
                message : "Product doesnot exists with that id"
            })
            return
        }
        await Cart.destroy({
            where : {
                UserId,
                productId
            }
        })
        res.status(200).json({
            message : "Cart Item deleted successfully"
        })
    }

    async UpdateMyCartItem(req:AuthRequest,res:Response):Promise<void>{
        const UserId = req.user?.id;
        const {productId} = req.params;
        const {quantity} = req.body;
        if(!quantity) {
            res.status(400).json({
                message : "Please provide quantity"
            })
            return
        }
        const cartData = await Cart.findOne({
            where : {
                UserId,
                productId
            }
        })
        if(cartData) {
            cartData.quantity = quantity
            await cartData.save();

        res.status(200).json({
            message : "Cart Item updated successfully",
            data : cartData
        })
        }
        else {
            res.status(404).json({
                message : "No cart items found with this productId"
            })
        }
    }
}

export default new cartController()