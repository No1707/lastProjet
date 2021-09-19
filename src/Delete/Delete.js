import axios from "axios";
// import { useState } from "react";
import "./Delete.css"

const Delete = ({i, setRecettes}) => {

    const id = i
    
    // const onDelete = () => setShowPopup(true)

    // const hidePopup = () => setShowPopup(false)

    // const Popup = () => (
    //     <div className="backgroundPopup">
    //         <div className="popup">
    //             <button onClick={deleteRecipe}>Supprimer</button>
    //             <button onClick={hidePopup}>Annuler</button>
    //         </div>
    //     </div>
    // )

    const deleteRecipe = () => {
        fetch("http://localhost:9000/api/recipe/"+id, {
            method: 'DELETE'
        }).then(res => res.json()).then(data => alert(data.message))
        .then(() => {
            axios.get("http://localhost:9000/api/recipes")
                .then(recipes => {
                    setRecettes(recipes.data)
                })
        })
    }

    return(
        <>
            {/* {showPopup ? <Popup /> : null} */}
            <button onClick={deleteRecipe}>Supprimer</button>
        </>
    )
};

export default Delete;