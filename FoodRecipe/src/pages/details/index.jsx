import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import { FaLeaf } from "react-icons/fa"; // Icon for ingredients
import Favorites from "../favorites";

export default function Details() {
  const { id } = useParams();
  const { recipeDetailsData, setRecipeDetailsData,handleAddToFavorite,favoriteList} =
   useContext(GlobalContext);


  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/get?rId=${id}`
        );
        const result = await response.json();
        if (result.recipe) {
          setRecipeDetailsData(result.recipe);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    }

    if (id) getRecipeDetails();
  }, [id, setRecipeDetailsData]);
  console.log(recipeDetailsData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-yellow-100 text-gray-900 py-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="flex flex-col items-center">
          <div className="w-90 h-96 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
            <img
              src={recipeDetailsData?.image_url}
              alt={recipeDetailsData?.title || "Recipe Image"}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="mt-5 text-3xl font-bold text-center">
            {recipeDetailsData?.title}
          </h1>
          <span className="text-lg text-cyan-400 mt-2">
            By {recipeDetailsData?.publisher}
          </span>
          <div className="mt-3">
          <button  
            onClick={() => handleAddToFavorite(recipeDetailsData)} // Corrected function name
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 
                inline-block shadow-md bg-orange-500 hover:bg-orange-600 text-white transition duration-300">
                     { favoriteList && favoriteList.length > 0 && 
                        favoriteList.findIndex((item) => item.recipe_id === recipeDetailsData?.recipe_id) !== -1
                        ? "Remove from Favorites"
                        : "Add to Favorites"
                      }
                </button>

          </div>
        </div>

        {/* Ingredients & Details */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
            Ingredients
          </h2>
          <ul className="space-y-3">
            {recipeDetailsData?.ingredients?.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 bg-white/20 p-3 rounded-lg shadow-md"
              >
                <FaLeaf className="text-green-300" /> {/* Leaf icon for vibe */}
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-6">
            <a
              href={recipeDetailsData?.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 
                        px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition duration-300"
            >
              View Full Recipe 😋
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
