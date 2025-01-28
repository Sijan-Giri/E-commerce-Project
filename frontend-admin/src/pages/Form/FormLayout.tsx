import { ChangeEvent, FormEvent, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { Product } from '../../types/data';
import { useAppDispatch } from '../../store/hook';
import { addProduct } from '../../store/dataSlice';

const FormLayout = () => {

  const dispatch = useAppDispatch()

  const [data , setData] = useState<Product>({
    productName : "",
    productPrice : 0,
    productDescription : "",
    productTotalStockQty : 0,
    UserId : "",
    CategoryId : ""
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name ,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addProduct(data))
  }

  return (
    <>
      <Breadcrumb pageName="Form Layout" />

      <div className="flex justify-center my-12">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Add Product
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-lg font-medium text-gray-800 dark:text-white">
                    Product Name
                  </label>
                  <input
                  onChange={handleChange}
                  name='productName'
                    type="text"
                    placeholder="Enter your product name"
                    className="w-full rounded-lg border-gray-300 shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-lg font-medium text-gray-800 dark:text-white">
                  Product TotalStockQty <span className="text-red-500">*</span>
                </label>
                <input
                onChange={handleChange}
                name='productTotalStockQty'
                  type="email"
                  placeholder="Enter product total stockqty"
                  className="w-full rounded-lg border-gray-300 shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>


              <div className="space-y-2">
                <label className="text-lg font-medium text-gray-800 dark:text-white">
                  Product Price
                </label>
                <input
                onChange={handleChange}
                name='productPrice'
                  type="text"
                  placeholder="Enter product price"
                  className="w-full rounded-lg border-gray-300 shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              <SelectGroupOne />

              {/* Message */}
              <div className="space-y-2">
                <label className="text-lg font-medium text-gray-800 dark:text-white">
                 Product Description
                </label>
                <input
                name='productDescription'
                  placeholder="Type your message"
                  className="w-full rounded-lg border-gray-300 shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition duration-300"
                  onChange={handleChange}
                ></input>
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
