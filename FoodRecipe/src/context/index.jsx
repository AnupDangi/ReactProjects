import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load favoriteList safely from localStorage
  const [favoriteList, setFavoriteList] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem("favoriteRecipes");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error parsing favoriteRecipes:", error);
      return [];
    }
  });

  // ✅ Load recipeList safely from localStorage
  const [recipeList, setRecipeList] = useState(() => {
    try {
      const storedRecipes = localStorage.getItem("storedRecipe");
      return storedRecipes ? JSON.parse(storedRecipes) : [];
    } catch (error) {
      console.error("Error parsing storedRecipe:", error);
      return [];
    }
  });

  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const navigate = useNavigate();

  // ✅ Save favoriteList & recipeList to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteList));
      localStorage.setItem("storedRecipe", JSON.stringify(recipeList));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [favoriteList, recipeList]);

  // ✅ Fetch recipes and store in state
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${searchParam}`
      );
      const result = await response.json();
      if (result.recipes) {
        setRecipeList(result.recipes);
      } else {
        setRecipeList([]);
      }
    } catch (e) {
      console.error(e);
      setSearchParam("");
    }
    setLoading(false);
  }

  // ✅ Toggle add/remove favorite
  function handleAddToFavorite(recipe) {
    setFavoriteList((prevList) => {
      const exists = prevList.some((item) => item.recipe_id === recipe.recipe_id);
      if (exists) {
        console.log("Removed from favorites:", recipe);
        return prevList.filter((item) => item.recipe_id !== recipe.recipe_id);
      } else {
        console.log("Added to favorites:", recipe);
        return [...prevList, recipe];
      }
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        recipeList,
        loading,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoriteList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
