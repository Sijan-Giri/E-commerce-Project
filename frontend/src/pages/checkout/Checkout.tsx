import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "../../globals/components/navbar/Navbar"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ItemDetails, OrderData, PaymentMethod } from "../../types/checkoutTypes";
import { orderItem } from "../../store/checkoutSlice";

const Checkout = () => {

  const [paymentMethod , setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD)
    const {items} = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch();

    const [data , setData] = useState<OrderData>({
      phoneNumber : "",
      shippingAddress : "",
      totalAmount : 0,
      paymentDetails : {
        paymentMethod : paymentMethod
      },
      items : []
    })

    const handlePaymentMethod = (e:ChangeEvent<HTMLInputElement>) => {
      setPaymentMethod(e.target.value as PaymentMethod)
      setData({
        ...data,
        paymentDetails : {
          paymentMethod : e.target.value as PaymentMethod
        }
      })
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
      const {name , value} = e.target;
      setData({
        ...data,
        [name] : value
      })
    }

    const totalAmount = (items && Array.isArray(items)) 
   ? items.reduce((total, item) => item?.Product?.productPrice * item?.quantity + total, 0)
   : 0;


    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const itemData : ItemDetails[] = items?.map((item) => {
       return {
        productId : item?.Product?.id ,
        quantity : item?.quantity
       }
      }) 

      const orderData = {
        ...data,
        items : itemData,
        totalAmount
      }

      dispatch(orderItem(orderData))
      
    }

  return (
    <>
      <Navbar />
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 gap-8 mt-8">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
          {
            items?.length > 0 && items?.map((item) => {
                return (
                    <>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="productImage"
                alt="Product"
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{item?.Product?.productName}</span>
                <span className="float-right text-gray-400">Qty: {item?.quantity}</span> 
                <p className="text-lg font-bold">{item?.Product?.productPrice}</p>
               </div>
            </div>
          </div>
                    </>
                )
            })
          }

          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                value={PaymentMethod.COD}
                type="radio"
                name="radio"
                onChange={handlePaymentMethod}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">COD (Cash On Delivery)</span>
                  <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                value={PaymentMethod.KHALTI}
                onChange={handlePaymentMethod}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Online (Khalti)</span>
                  <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                </div>
              </label>
            </div>
          </form>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">Complete your order by providing your payment details.</p>
            <div className="">
              <label htmlFor="phoneNumber" className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
              <div className="relative">
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="phoneNumber"
                  onChange={handleChange}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-18 0v1.5a2.5 2.5 0 005 0V12"
                    />
                  </svg>
                </div>
              </div>
              <label htmlFor="shipping-address" className="mt-4 mb-2 block text-sm font-medium">Shipping Address</label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="shipping-address"
                    name="shippingAddress"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Shipping Address"
                    onChange={handleChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11c0 2.314-2.239 3.875-3.94 3.875S4 13.5 4 11a8 8 0 1116 0c0 2.314-2.239 3.875-3.94 3.875S12 13.5 12 11z"
                      />
                    </svg>
                  </div>
                </div>
                <select
                  name="billing-state"
                  className="mt-3 w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:ml-3 sm:mt-0 sm:w-1/3"
                >
                  <option value="State">State</option>
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Pokhara">Pokhara</option>
                  <option value="Nepalgunj">Nepalgunj</option>
                </select>
                <input
                  type="text"
                  name="billing-zip"
                  className="mt-3 flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:ml-3 sm:mt-0 sm:w-1/6"
                  placeholder="ZIP"
                />
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">Rs {totalAmount}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">Rs 100</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">Rs {totalAmount + 100}</p>
              </div>
            </div>
            {
              paymentMethod == PaymentMethod.COD ? (
                <>
                <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              Pay with COD
            </button>
                </>
              ) : (
              <>
              <button className="mt-4 mb-8 w-full rounded-md bg-purple-900 px-6 py-3 font-medium text-white">
              Pay with Khalti
            </button>
              </>
              
              )
            }
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
