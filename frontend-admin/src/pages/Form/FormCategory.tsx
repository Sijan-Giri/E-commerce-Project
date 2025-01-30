import { ChangeEvent, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useAppDispatch } from "../../store/hook";
import { addCategory } from "../../store/dataSlice";

const FormCategory = () => {

    const dispatch = useAppDispatch()

    const [categoryData , setCategoryData] = useState({
        categoryName : ""
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name , value} = e.target;
        setCategoryData({
            ...categoryData,
            [name] : value
        })
    }

    const handleSubmit = (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCategory(categoryData))
    }
 
  return (
    <>
    <Breadcrumb pageName="Form Layout" />
  
    <div className="flex justify-center my-12">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-1800">
            Add Category
          </h3>
        </div>
  
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  Category Name
                </label>
                <input
                onChange={handleChange}
                  name="categoryName"
                  type="text"
                  placeholder="Enter your category name"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-blue-500 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
            </div>  
            {/* Submit Button */}
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 transition duration-300">
             Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  

  );
};

export default FormCategory;
