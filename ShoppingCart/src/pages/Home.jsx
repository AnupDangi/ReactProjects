import {  FadeLoader } from "react-spinners";
import ProductTile from "../components/Products/ProductTile";
import {useState,useEffect} from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchListOfProducts() {
    setLoading(true);
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json();

    if (data) {
      setLoading(false);
      setProducts(data);
    }
  }

  useEffect(() => {
    fetchListOfProducts();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center ">

        <FadeLoader 
          color="#ff0000" 
          loading={true} 
          size={120} 
          className="w-full flex justify-center"
        />
        </div>
      ) : 
        //we got the data
        <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 lag:grid-col-4 max-w-6xl mx-auto p-3">
          {
            products && products.length ?
            products.map((item)=> ( <ProductTile  key={item.id} product={item} />))
            :null
          }
        </div>
      }
    </div>
  );
}
