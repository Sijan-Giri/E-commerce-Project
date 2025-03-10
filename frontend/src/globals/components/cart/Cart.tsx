import { Link } from "react-router-dom";
import { deleteCartItem, updateCartItem } from "../../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Navbar from "../navbar/Navbar";

const Cart = () => {
    const { items } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const handleDelete = (productId: string) => {
        dispatch(deleteCartItem(productId));
    };

    const handleUpdate = (productId: string, quantity: number) => {
            dispatch(updateCartItem( productId, quantity ));
    };

    const totalItemInCart = items.reduce((total,item) => item?.quantity + total,0);
    const totalPriceInCart = items.reduce((total,item) => item?.Product?.productPrice * item?.quantity + total,0)

    return (
        <>
            <Navbar />
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Shopping Cart
                    </h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                {items.length > 0 &&
                                    items.map((item) => {
                                        return (
                                            <div
                                                key={item?.Product?.id}
                                                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                                            >
                                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                    <a href="#" className="shrink-0 md:order-1">
                                                        <img
                                                            className="h-20 w-20 dark:hidden"
                                                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                                            alt="imac image"
                                                        />
                                                        <img
                                                            className="hidden h-20 w-20 dark:block"
                                                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                            alt="imac image"
                                                        />
                                                    </a>

                                                    <label
                                                        htmlFor="counter-input"
                                                        className="sr-only"
                                                    >
                                                        Choose quantity:
                                                    </label>
                                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                        <div className="flex items-center">
                                                            {/* Decrement Button */}
                                                            <button
                                                                type="button"
                                                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        item?.Product?.id,
                                                                        item?.quantity - 1
                                                                    )
                                                                }
                                                            >
                                                                <svg
                                                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 18 2"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M1 1h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <input
                                                                type="text"
                                                                id="counter-input"
                                                                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                                                placeholder=""
                                                                value={item?.quantity}
                                                                required
                                                                onChange={(e) =>
                                                                    handleUpdate(
                                                                        item?.Product?.id,
                                                                        parseInt(e.target.value)
                                                                    )
                                                                }
                                                            />
                                                            {/* Increment Button */}
                                                            <button
                                                                type="button"
                                                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        item?.Product?.id,
                                                                        item?.quantity + 1
                                                                    )
                                                                }
                                                            >
                                                                <svg
                                                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 18 18"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M9 1v16M1 9h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="text-end md:order-4 md:w-32">
                                                            <p className="text-base font-bold text-gray-900 dark:text-white">
                                                                ${item?.Product?.productPrice}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                        <a
                                                            href="#"
                                                            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                                                        >
                                                            {item?.Product?.productName}
                                                        </a>
                                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                                            <span className="text-indigo-600 font-bold">
                                                                Category:
                                                            </span>
                                                            <span className="text-gray-800 dark:text-gray-200">
                                                                {item?.Product?.Category?.categoryName}
                                                            </span>
                                                        </h3>
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                            onClick={() => {
                                                                handleDelete(item?.Product?.id);
                                                            }}
                                                        >
                                                            <svg
                                                                className="me-1.5 h-5 w-5"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M6 18 17.94 6M18 18 6.06 6"
                                                                />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Order Summary
                                </p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                Total Quantity
                                            </dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                {totalItemInCart}
                                            </dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                Total Price
                                            </dt>
                                            <dd className="text-base font-medium text-green-600">
                                                Rs. {totalPriceInCart}
                                            </dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                Shipping
                                            </dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                Rs. 100
                                            </dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                                            Total
                                        </dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                                            Rs. {totalPriceInCart + 100}
                                        </dd>
                                    </dl>
                                </div>
                               <Link to="/checkout"> <a
                                className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-bold text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-gradient-to-r dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 dark:hover:from-indigo-800 dark:hover:via-purple-800 dark:hover:to-pink-800 dark:focus:ring-indigo-600 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
                            >
                                Proceed to Checkout
                            </a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
