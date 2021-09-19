import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const Modify = () => {

    const { id } = useParams()
    const [recette, setRecette] = useState(null)

    console.log(recette)

    useEffect(() => {
        fetch("http://localhost:9000/api/recipe/" + id)
            .then(res => res.json())
            .then(recipe => {
                setRecette(recipe)
            })
    }, [])

    const onInputChange = (val) => {
        const name = val.target.id
        const theVal = val.target.value

        if (val.target.className === "inputLevel") {

            setRecette(e => {
                return { ...e, niveau: name }
            })
        } else if (val.target.className === "inputPeople" || val.target.className === "inputTime") {

            setRecette(e => {
                return { ...e, [name]: parseInt(theVal) }
            })
        } else if (val.target.className === "inputStep") {

            setRecette(e => {
                return { ...e, etapes: [theVal] }
            })
        } else {
            const theVal = val.target.value

            setRecette(e => {
                return { ...e, [name]: theVal }
            })
        }
    }

    const onAddStep = (type) => {

        if(type === "step"){
            const newStep = recette.etapes
            newStep.push("")
            setRecette({ ...recette, [recette.etapes]: newStep })
            console.log(recette.etapes)
        } else if(type === "ingredient"){
            const newIngredient = recette.ingredients
            newIngredient.push(["",""])
            // setRecettes({ ...recettes, [recettes.etapes]: newStep })
            // console.log(recettes.etapes)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const ingredient = Array.from(document.querySelectorAll(".ingredients input, .ingredients select"))
        const [nbr, unit, ingr] = [...ingredient]
        const nbrUnit = nbr.value + unit.value
        const res = [[nbrUnit, ingr.value]]

        setRecette(e => {
            return { ...e, ingredients: res }
        })

        if (recette.photo) {
            const photoURL = recette.photo.substr(0, 8)
            if (photoURL.includes("https://") || photoURL.includes("http://")) {
                axios.put("http://localhost:9000/api/recipe/"+id, recette)
                    .then(res => console.log(res)).catch(error => console.log(error))
            } else {
                alert("L'URL de la photo est incorrecte")
                document.querySelector(".inputPhoto").style.borderColor = "red"
            }
        } else {
            axios.put("http://localhost:9000/api/recipe/"+id, recette)
                .then(res => console.log(res)).catch(error => console.log(error))
        }
        console.log(recette)
    }

    const levels = [ "padawan", "jedi", "maitre" ]

    return(
        <>
            {recette && 
                <form className="add" onSubmit={onSubmit}>
                    <label>
                        <span>Titre:</span>
                        <input placeholder="Titre de la recette" value={recette.titre} onChange={onInputChange} id="titre" className="inputTitle" type="text" required />
                    </label>
                    <label>
                        <span>Photo:</span>
                        <input placeholder="URL de la photo" value={recette.photo} onChange={onInputChange} id="photo" className="inputPhoto" type="text" />
                    </label>
                    <label>
                        <span>Niveau:</span>
                        {levels.map( (level) => (
                            <>
                                <input key={"input"+level} id={level} name="inputLevel" className="inputLevel" type="radio" required onChange={onInputChange} defaultChecked={recette.niveau === level} />
                                <label style={{textTransform: "capitalize"}} key={"label"+level} className="levelLabel" htmlFor={level}>{level}</label>
                            </>
                        ))}
                    </label>
                    <label>
                        <span>Description:</span>
                        <textarea placeholder="Décrivez la recette" value={recette.description} onChange={onInputChange} id="description" className="inputDesc" type="text" cols="30" rows="10" required></textarea>
                    </label>
                    <label>
                        <span>Personnes:</span>
                        <input value={recette.personnes} onChange={onInputChange} id="personnes" className="inputPeople" min="1" type="number" required />
                    </label>
                    <label>
                        <span>Temps de préparation (min):</span>
                        <input placeholder="Combien de temps" value={recette.tempsPreparation} onChange={onInputChange} id="tempsPreparation" className="inputTime" min="1" type="number" required />
                    </label>
                    <label>
                        <span>Etapes:</span>
                        <div className="steps">
                            <div className="step">
                                <textarea placeholder="Etape à suivre" onChange={onInputChange} className="inputStep" id="etapes" cols="50" rows="2" required />
                            </div>
                        </div>
                    </label>
                    <button type="button" onClick={onAddStep}>Ajouter une étape</button>
                    <label className="ingredients">
                        <span>Ingredients:</span>
                        <input type="number" />
                        <select className="mesure">
                            <option value="g">g</option>
                            <option value="mg">mg</option>
                            <option value="l">l</option>
                            <option value="cl">cl</option>
                            <option value=""></option>
                        </select>
                        <input type="text" required />

                        {/* <div className="ingredients">
                        <div className="ingredient">
                            <textarea placeholder="Ingrédient" name="" id="ingredients" cols="50" rows="2" required value={inputs.ingredients} onChange={onInputChange}></textarea>
                        </div>
                    </div> */}

                    </label>
                    {/* <button onClick={onAddIngredients}>Ajouter un ingrédient</button> */}

                    <input type="submit" value="Ajouter la recette" />
                </form>
            }
            
        </>
    )
};

export default Modify;