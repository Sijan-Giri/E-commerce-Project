import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useEffect } from 'react';
import { fetchProducts } from '../../store/dataSlice';

const TableTwo = () => {

  const {products} = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  },[])

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
        Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Product Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Product Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">created_At</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Product Qty</p>
        </div>
      </div>

      {products?.length > 0 && products?.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {product?.productName}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product?.CategoryId}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product?.productPrice}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{new Date(product?.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{product?.productTotalStockQty}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
