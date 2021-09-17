import { useEffect, useState } from "react";
import Recipe from "../Recipe/Recipe";

import './Homepage.css'

const Homepage = () => {

    const [recettes, setRecettes] = useState(null)

    useEffect(() => {
        fetch("http://localhost:9000/api/recipes")
            .then(res => res.json())
            .then(recipes => {
                setRecettes(recipes)
            })
    }, [])

    return (
        <div className="recipeList">
            {recettes && recettes.map((recette) => {
                return <Recipe key={recette.id} recette={recette} />
            })}
        </div>
    )
}


export default Homepage;