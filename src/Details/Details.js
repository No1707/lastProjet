import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Details.css'
import Delete from '../Delete/Delete'

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

    let steps = 0

    return(
        <>
            {recette && 
                <div className="details">
                    <h2 className="details_title">{recette.titre}</h2>
                    <div className="details_details">
                        <div style={{backgroundImage: "url("+`${recette.photo}`+")"}} className="details_img"></div>
                        <div className="details_infos">
                            <p className="details_desc">C'est quoi "{recette.titre}" ? Grossièrement, voilà: <br/><br/> {recette.description}</p>
                            <ul style={{listStyle: "square"}}>
                                <li>Niveau: {recette.niveau}</li>
                                <li>Parts: {recette.personnes}</li>
                                <li>Temps de préparation: {recette.tempsPreparation > 60 ?
                                Math.floor(recette.tempsPreparation / 60) + "h" + recette.tempsPreparation % 60 : recette.tempsPreparation}</li>
                            </ul>
                            <ul className="details_ingredients">
                                <h3>Ingrédients:</h3>
                                {recette.ingredients.map((i) => {
                                    return <li key={i[1]}>{i[0]} {i[1]}</li>
                                })}
                            </ul>
                            <ul className="details_steps">
                                <h3>Etapes:</h3>
                                {recette.etapes.map((e) => {
                                    steps++
                                    return <li key={e}>{steps}. {e}</li>
                                })}
                            </ul>
                            <div className="details_button">
                                <Delete i={id} setRecettes={setRecette} ></Delete>
                                <Link to={{ pathname: '/recipe/modify/' + id }}>Modifier</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default Details;