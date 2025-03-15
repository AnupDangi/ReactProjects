import MenuList from "./menuList"
import "./Menu.css";
export default function TreeView({menus=[]}){
    return(
        <div className="tree-view-container">
              <MenuList list={menus}/>  
        </div>
    )
}