import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/slices/cart-slice";

export default function CartTile({ cardItem }) {
  const dispatch = useDispatch();

  function handleRemoveFromCart() {
    dispatch(removeFromCart(cardItem.id));
  }

  return (
    <div className=" mt-3 flex items-center bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-300 p-4 border border-gray-200">
      {/* Product Image */}
      <img
        src={cardItem?.image}
        alt={cardItem?.title}
        className="h-32 w-32 object-cover rounded-lg"
      />

      {/* Product Details */}
      <div className="ml-6 flex flex-col flex-grow">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          {cardItem?.title}
        </h1>
        <p className="text-gray-600 text-lg font-bold mt-2">₹{cardItem?.price}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemoveFromCart}
        className= " sm:size-min bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md transform hover:scale-95">
        Remove
      </button>
    </div>
  );
}
