import { Link } from "react-router-dom";
import { Product } from "../../../types/productTypes";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {

  return (
    <Link to={`/cardDetails/${product?.id}`}>
    <div className="relative flex w-full max-w-[26rem] flex-col rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">

<div className="relative overflow-hidden rounded-t-3xl">
  <img
    src="data:image/jpeg;base64,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"
    alt="Product Image"
    className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
</div>

<div className="p-6 flex flex-col gap-3">

  <div className="flex items-center justify-between">
    <h5 className="font-sans text-2xl font-semibold text-gray-900">{product?.productName}</h5>
    <p className="flex items-center gap-1.5 text-base text-yellow-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="-mt-0.5 h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        ></path>
      </svg>
      5.0
    </p>
  </div>

  <p className="text-base text-gray-600">{product?.productDescription}</p>

  <div className="flex items-center justify-between mt-4">
    <span className="text-lg font-semibold text-gray-900">${product?.productPrice}</span>
    <span className="text-xs font-semibold text-green-600 bg-green-100 py-1 px-3 rounded-full">Sale</span>
  </div>
</div>

<div className="p-6 pt-3">
  <button className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-pink-400 py-3.5 text-white font-bold text-sm uppercase shadow-md hover:shadow-lg transition-all ease-in-out duration-300 transform hover:scale-105">
    Explore More
  </button>
</div>
</div>
    </Link>
  );
};

export default Card;
