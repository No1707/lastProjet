import { Link } from 'react-router-dom'
import './Recipe.css'

import Modify from '../Modify/Modify'
import Delete from '../Delete/Delete'

const Recipe = (recette) => {

    const id = recette.recette.id

    return (
        <>
            <Link to={{pathname:'/recipes/'+id}} className="recipe">
                    <div className="recipe_details">
                        <img src={recette.recette.photo}></img>
                        <div>
                        <p className="recipe_details_title"><span>{recette.recette.titre}</span></p>
                            <p className="recipe_details_level">Niveau: <span>{recette.recette.niveau}</span></p>
                            <p className="recipe_details_people">Pour: <span>{recette.recette.personnes}</span> personne{recette.recette.personnes > 1 ? "s" : null}</p>
                            <p className="recipe_details_time">Temps de préparation: <span>{recette.recette.tempsPreparation}</span>min</p>
                        </div>
                    </div>
                    <div className="recipe_infos">
                        <p className="recipe_details_time">{recette.recette.description}</p>
                        <div className="buttons">
                            <Delete id={id}></Delete>
                            {/* <Link to="/modify">Modifier</Link> */}
                        </div>
                    </div>
            </Link>
        </>
    );
};

export default Recipe;