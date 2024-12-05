import Category from "../model/category"
import { Request , Response } from "express";

class CategoryController{
    categoryData = [
        {
            categoryName : "Electronics"
        },
        {
            categoryName : "Groceries"
        },
        {
            categoryName : "Food/Beverages"
        }
    ]
    async seedCategory():Promise<void> {
        const datas = await Category.findAll();
        if(datas.length === 0) {
            await Category.bulkCreate(this.categoryData);
            console.log("Category seeded successfully")
        }
        else {
            console.log("Category already seeded")
        }
    }

    async addCategory(req:Request,res:Response):Promise<void> {
        const {categoryName} = req.body;
        if(!categoryName) {
            res.status(400).json({
                message : "Please provide category name"
            })
            return
        }
        const data = await Category.create({
            categoryName
        })
        res.status(200).json({
            message : "Category created successfully",
            data : data
        })
    }

    async getAllCategory(req:Request,res:Response):Promise<void> {
        const datas = await Category.findAll();
        if(datas.length == 0){
            res.status(404).json({
                message : "No category found"
            })
        }
        else {
            res.status(200).json({
                message : "Category fetched successfully",
                data : datas
            })
        }
    }
    async getSingleCategory(req:Request,res:Response):Promise<void> {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : "Please provide id"
            })
            return
        }
        const data = await Category.findAll({
            where : {
                id : id
            }
        })
        if(data.length == 0) {
            res.status(404).json({
                message : "No category found with this id"
            })
        }
        else {
            res.status(200).json({
                message : "Category fetched successfully",
                data : data
            })
        }
    }

    async deleteCategory(req:Request,res:Response):Promise<void> {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : "Please provide id"
            })
            return
        }
        const data = await Category.findAll({
            where : {
                id : id
            }
        })
        if(data.length == 0) {
            res.status(404).json({
                message : 'No category found with this id'
            })
        }
        else {
            await Category.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).json({
                message : "Category deleted successfully"
            })
        }
    }

    async updateCategory(req:Request,res:Response):Promise<void> {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : "Please provide id"
            })
            return
        }
        const {categoryName} = req.body;
        if(!categoryName) {
            res.status(400).json({
                message : "Please provide categoryName"
            })
            return
        }
        const updatedCategory = await Category.update({categoryName},{
            where : {
                id : id
            }
        })
        res.status(400).json({
            message :  "Category updated successfully",
            data : updatedCategory  
        })
    }
}

export default new CategoryController()