import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CartTile from "../components/CartTile/CartTile";
export default function Cart() {
  const [totalCart, setTotalCart] = useState([]);
  const { cart } = useSelector((state) => state);

  console.log(cart);

  useEffect(() => {
    setTotalCart(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);
  console.log(cart, totalCart);

  return (
    <div className="flex justify-center ">
      {cart && cart.length ? (
        <>
        <div className="min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto">
          <div className="flex flex-col justify-center items-center p-3">
            {cart.map((item) => (
                <CartTile cardItem={item} />
             ))
            }
          </div>
        </div>
            <div className="w-[300px]">
                <div className="flex flex-col justify-center items-end p-5 space-y-5 mt-14">
                    <h1 className="font-bold text-lg text-red-800">
                        Your Cart Summary
                    </h1>
                    <p>
                        <span className="text-gray-800 font-bold">
                          <span>Total Items: {cart.length}</span> 
                        </span>
                    </p>
                    <p>
                    <span className="text-gray-800 font-bold">
                        <span>Total Cost:{totalCart}</span> 
                    </span>
                    </p>
                </div>
            </div>
        </>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-800 font-bold text-xl mb-2">
            Your Cart is Empty
          </h1>
          <Link to={"/"}>
            <button className="bg-red-950 text-white border-2 rounded-lg font-bold p-4">
              Shop Now!!
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
