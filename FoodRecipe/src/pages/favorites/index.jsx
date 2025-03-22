import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/Recipe-item";

export default function Favorites(){
    const {favoriteList}=useContext(GlobalContext);
    console.log(favoriteList);
    return(
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10"> 
            {favoriteList && favoriteList.length>0?(
                favoriteList.map((item)=><RecipeItem item={item}/>)
                ):(
                    <div className="lg:text-4xl text-center text-black font-extrabold">
                        <p>Nothing is added</p></div>
                )}
        </div>
    )
}