import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css'

const Details = () => {

    const {id} = useParams()
    const [recette, setRecette] = useState(null)

    useEffect(() => {
        fetch("http://localhost:9000/api/recipe/"+id)
            .then(res => res.json())
            .then(recipe => {
                setRecette(recipe)
            })
    }, [])

    return(
        <>
            {recette && 
                <div className="details">
                    <h2 className="details_title">{recette.titre}</h2>
                    <div className="details_details">
                        <div style={{backgroundImage: "url("+`${recette.photo}`+")"}} className="details_img"></div>
                        <div className="details_infos">
                            <p className="details_desc">C'est quoi "{recette.titre}" ?? En gros, c'est {recette.description}</p>
                            <ul style={{listStyle: "square"}}>
                                <li>Niveau: {recette.niveau}</li>
                                <li>Parts: {recette.personnes}</li>
                                <li>Temps de préparation: {recette.tempsPreparation > 60 ?
                                Math.floor(recette.tempsPreparation / 60) + "h" + recette.tempsPreparation % 60 : recette.tempsPreparation}</li>
                            </ul>
                            <h3>Ingrédients:</h3>
                            <ul className="details_ingredients">
                                {recette.ingredients.map((i) => {
                                    return <li key={i[1]}>{i[0]} {i[1]}</li>
                                })}
                            </ul>
                            <h3>Etapes:</h3>
                            <ul className="details_steps">
                                {recette.etapes.map((e) => {
                                    return <li key={e}>{e}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default Details;