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

    public static async getSingleProduct(req:AuthRequest , res:Response):Promise<void> {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : "Please provide id"
            })
            return
        }
        const data = await Product.findAll({
            where : {
                id : id
            },
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
        })
        if(data.length === 0) {
            res.status(404).json({
                message : "No product found with this id"
            })
        }
        else {
            res.status(200).json({
                message : "Product fetched successfully",
                data : data
            })
        }
    }

    public static async deleteProduct(req:AuthRequest,res:Response):Promise<void> {
        const {id} = req.params
        if(!id) {
            res.status(400).json({
                message : "Please provide id"
            })
            return
        }
        const data = await Product.findAll({
            where : {
                id : id
            }
        })
        if(data.length == 0) {
            res.status(404).json({
                message : "Product not found with this id"
            })
        }
        else {
            await Product.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).json({
                message : "Product deleted successfully"
            })
        }
    }

    public static async updateProduct(req:AuthRequest,res:Response):Promise<void> {
        const {id} = req.params;
        const {productName , productPrice , productDescription , productimageUrl , productTotalStockQty} = req.body
        if(!id) {
            res.status(400).json({
                message : "Please provide id"
            })
            return
        }
        if(!productName || !productPrice || !productDescription || !productTotalStockQty) {
            res.status(400).json({
                message : "Please provide productName , productPrice , productDescription , productTotalStockQty"
            })
            return
        }
        const data = await Product.findAll({
            where : {
                id : id
            }
        })
        if(data.length == 0){
            res.status(404).json({
                message : "Product with this id not found"
            })
        }
        const updatedProduct = await Product.update({productName,productDescription,productPrice,productTotalStockQty},{
            where : {
                id : id
            }
        })
        res.status(200).json({
            message : "Product updated successfully",
            data : updatedProduct
        })
    }
}

export default ProductController