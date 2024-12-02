import { Response } from "express";
import Product from "../model/productModel";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../model/userModel";
import Category from "../model/category";

class ProductController{
    public static async addProduct(req:AuthRequest , res:Response):Promise<void> {
        const userId = req.user?.id
        const {productName,productDescription,productimageUrl,productPrice,productTotalStockQty,categoryId} = req.body;
        let fileName;
        if(req.file) {
            fileName = req.file?.filename
        }
        if(!productName || !productDescription || !productPrice || !productTotalStockQty || !categoryId) {
            res.status(400).json({
                message : "Please provide productName , productDescription , categoryId , productPrice & productTotalStockQty"
            })
            return
        }
        await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStockQty,
            productimageUrl : fileName,
            UserId : userId,
            CategoryId : categoryId
        })
        res.status(200).json({
            message : "Product created successfully"
        })
    }

    public static async getAllProducts(req:Request,res:Response):Promise<void> {
        const datas = await Product.findAll(
            {
                include : [
                    {
                        model : User,
                        attributes : ["id","email","username"]
                    },
                    {
                        model : Category,
                        attributes : ["id","categoryName"]
                    }
                ]
            }
        )
        if(datas.length == 0) {
            res.status(400).json({
                message : "No products found"
            })
        }
        else {
            res.status(200).json({
                message : "Datas fetched successfully",
                data : datas
            })
        } 
    }
}

export default ProductController