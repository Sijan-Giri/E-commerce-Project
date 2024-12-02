import Category from "../model/category"


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
}

export default new CategoryController()