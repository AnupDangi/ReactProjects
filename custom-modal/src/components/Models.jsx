import { useState } from "react"
import Model from "./Model";


export default function Models(){
    const [showModalPopup,setShowModalPopup]=useState(false);

    function handleToggleModalPopup(){
        setShowModalPopup(!showModalPopup);
    }

    function onClose(){
        setShowModalPopup(false);
    }

    return(
        <div>
            <button onClick={handleToggleModalPopup}>Open Modal Popup</button>
            {
                showModalPopup && <Model onClose={onClose}/>
            }
        </div>
    )
}