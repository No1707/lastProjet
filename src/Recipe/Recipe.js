import { Link } from 'react-router-dom'
import './Recipe.css'

import Delete from '../Delete/Delete'

const Recipe = ({recette, setRecettes}) => {

    const id = recette.id

    return (
        <div className="recipe">
            <Link to={{pathname:'/recipe/'+id}} className="recipe_detail_link">
                    <div className="recipe_details">
                        <img src={recette.photo}></img>
                        <div>
                        <p className="recipe_details_title"><span>{recette.titre}</span></p>
                            <p className="recipe_details_level">Niveau: <span>{recette.niveau}</span></p>
                            <p className="recipe_details_people">Pour: <span>{recette.personnes}</span> personne{recette.personnes > 1 ? "s" : null}</p>
                            <p className="recipe_details_time">Temps de préparation: <span>{recette.tempsPreparation > 60 ? 
                                Math.floor(recette.tempsPreparation / 60) + "h" + recette.tempsPreparation % 60 : recette.tempsPreparation}
                                </span>min</p>
                        </div>
                    </div>
                    <div className="recipe_infos">
                        <p className="recipe_details_time">{recette.description}</p>
                    </div>
            </Link>
            <div className="buttons">
                <Delete i={id} setRecettes={setRecettes} ></Delete>
                <Link to={{pathname:'/recipe/modify/'+id}}>Modifier</Link>
            </div>
        </div>
    )
}

export default Recipe