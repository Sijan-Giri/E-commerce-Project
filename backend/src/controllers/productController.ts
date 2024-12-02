import { Response } from "express";
import Product from "../model/productModel";
import { AuthRequest } from "../middleware/authMiddleware";

class ProductController{
    public static async addProduct(req:AuthRequest , res:Response):Promise<void> {
        const userId = req.user?.id
        const {productName,productDescription,productimageUrl,productPrice,productTotalStockQty} = req.body;
        let fileName;
        if(req.file) {
            fileName = req.file?.filename
        }
        if(!productName || !productDescription || !productPrice || !productTotalStockQty) {
            res.status(400).json({
                message : "Please provide productName , productDescription , productPrice & productTotalStockQty"
            })
            return
        }
        await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStockQty,
            productimageUrl : fileName,
            UserId : userId
        })
        res.status(200).json({
            message : "Product created successfully"
        })
    }
}

export default ProductController