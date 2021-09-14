import './Recipe.css'

const Recipe = (recette) => {

    console.log(recette)

    return (
        <a href='' className="recipe">
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
                    <div>
                        <button>Supprimer</button>
                        <button>Modifier</button>
                    </div>
                </div>
        </a>
    );
};

export default Recipe;