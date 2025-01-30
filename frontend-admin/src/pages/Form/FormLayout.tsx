import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Product } from '../../types/data';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { addProduct, fetchCategory } from '../../store/dataSlice';
import { Status } from '../../types/status';
import { useNavigate } from 'react-router-dom';

const FormLayout = () => {

  const dispatch = useAppDispatch();
  const {category , status} = useAppSelector((state) => state.data);
  const navigate = useNavigate();

  const [data , setData] = useState<Product>({
    productName : "",
    productPrice : 0,
    productDescription : "",
    productTotalStockQty : 0,
    CategoryId : ""
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name ,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addProduct(data))
    if(status == Status.SUCCESS) {
      navigate("/tables")
    }
  }

  useEffect(() => {
    dispatch(fetchCategory())
  },[])

  return (
    <>
    <Breadcrumb pageName="Form Layout" />
  
    <div className="flex justify-center my-12">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-1800">
            Add Product
          </h3>
        </div>
  
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  Product Name
                </label>
                <input
                  onChange={handleChange}
                  name="productName"
                  type="text"
                  placeholder="Enter your product name"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-blue-500 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
            </div>
  
            {/* Product Total Stock Qty */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Product Total Stock Qty <span className="text-red-500">*</span>
              </label>
              <input
                onChange={handleChange}
                name="productTotalStockQty"
                type="number"
                placeholder="Enter product total stock qty"
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-blue-500 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
  
            {/* Product Price */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Product Price
              </label>
              <input
                onChange={handleChange}
                name="productPrice"
                type="text"
                placeholder="Enter product price"
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-blue-500 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
  
            {/* Product Category */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Product Category
              </label>
              <select
                onChange={handleChange}
                name="CategoryId"
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-blue-500 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="">Select a category</option>
                {
                  category?.length > 0 && category?.map((item) => {
                    return (
                      <>
                      <option key={item?.id} value={item?.id}>{item?.categoryName}</option>
                      </>
                    )
                  })
                }
              </select>
            </div>

  
            {/* Product Description */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Product Description
              </label>
              <input
                name="productDescription"
                placeholder="Type your product description"
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-800 dark:text-white dark:focus:ring-2 dark:focus:ring-blue-500 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
                onChange={handleChange}
              />
            </div>
  
            {/* Submit Button */}
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 transition duration-300">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  

  );
};

export default FormLayout;
