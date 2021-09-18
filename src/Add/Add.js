import axios from "axios";
import { useState } from "react"
import './Add.css'

const Add = () => {
    
    const[inputs, setInputs] = useState({
        titre: "",
        description: "",
        photo: "",
        tempsPreparation: 0,
        personnes: 1,
        niveau: "",
        ingredients: [],
        etapes: []
    })

    // const containerDiv = document.querySelector('.steps')

    const onInputChange = (val) => {
        const name = val.target.id
        const theVal = val.target.value
        
        if(val.target.className === "inputLevel"){

            setInputs(e => {
                return { ...e, niveau: name }
            })
        } else if (val.target.className === "inputPeople" || val.target.className === "inputTime" ) {

            setInputs(e => {
                return { ...e, [name]: parseInt(theVal) }
            })
        } else if(val.target.className === "inputStep"){

            setInputs(e => {
                return { ...e, etapes: [theVal] }
            })
        } else {
            const theVal = val.target.value
            
            setInputs(e => {
                return { ...e, [name]: theVal }
            })
        }
    }

    // const onTextareaChange = (val) => {

    // }

    const onAddStep = (e) => {
        e.preventDefault()

        const newStep = document.createElement('div');
        newStep.className = "step"
        newStep.innerHTML = 
        `
            <textarea placeholder="Etape à suivre" onChange={onInputChange} className="inputStep" id="etapes" cols="50" rows="2" required></textarea>
        `
        
        const steps = document.querySelector(".steps")
        steps.appendChild(newStep)
    }

    const onDeleteStep = (e) => {
        e.preventDefault()
        
    }

    const onAddIngredients = () => {

    }

    const onSubmit = (e) => {
        e.preventDefault()

        const ingredient = Array.from(document.querySelectorAll(".ingredients input, .ingredients select"))
        const [nbr, unit, ingr] = [...ingredient]
        const nbrUnit = nbr.value+unit.value
        const res = [[nbrUnit, ingr.value]]

        setInputs(e => {
            return {...e, ingredients: res}
        })

        if (inputs.photo) {
            const photoURL = inputs.photo.substr(0, 8)
            if (photoURL.includes("https://") || photoURL.includes("http://")) {
                axios.post("http://localhost:9000/api/recipes", inputs)
                    .then(res => console.log(res)).catch(error => console.log(error))
            } else {
                alert("L'URL de la photo est incorrecte")
                document.querySelector(".inputPhoto").style.borderColor = "red"
            }
        } else {
            axios.post("http://localhost:9000/api/recipes", inputs)
                .then(res => console.log(res)).catch(error => console.log(error))
        }
        console.log(inputs)
    }

    return(
            <form className="add" onSubmit={onSubmit}>
                <label>
                    <span>Titre:</span>
                    <input placeholder="Titre de la recette" value={inputs.titre} onChange={onInputChange} id="titre" className="inputTitle" type="text" required />
                </label>
                <label>
                    <span>Photo:</span>
                    <input placeholder="URL de la photo" value={inputs.photo} onChange={onInputChange} id="photo" className="inputPhoto" type="text" />
                </label>
                <label>
                    <span>Niveau:</span>
                    <input id="padawan" name="inputLevel" className="inputLevel" type="radio" required onChange={onInputChange} />
                    <label className="levelLabel" htmlFor="padawan">Padawan</label>
                    <input id="jedi" name="inputLevel" className="inputLevel" type="radio" required onChange={onInputChange} />
                    <label className="levelLabel" htmlFor="jedi">Jedi</label>
                    <input id="maitre" name="inputLevel" className="inputLevel" type="radio" required onChange={onInputChange} />
                    <label className="levelLabel" htmlFor="maitre">Maitre</label>
                </label>
                <label>
                    <span>Description:</span>
                    <textarea placeholder="Décrivez la recette" value={inputs.description} onChange={onInputChange} id="description" className="inputDesc" type="text" cols="30" rows="10" required></textarea>
                </label>
                <label>
                    <span>Personnes:</span>
                    <input value={inputs.personnes} onChange={onInputChange} id="personnes" className="inputPeople" min="1" type="number" required />
                </label>
                <label>
                    <span>Temps de préparation (min):</span>
                <input placeholder="Combien de temps" value={inputs.tempsPreparation} onChange={onInputChange} id="tempsPreparation" className="inputTime" min="1" type="number" required />
                </label>
                <label>
                    <span>Etapes:</span>
                    <div className="steps">
                        <div className="step">
                            <textarea placeholder="Etape à suivre" onChange={onInputChange} className="inputStep" id="etapes" cols="50" rows="2" required />
                        </div>
                    </div>
                </label>
                {/* <button onClick={onAddStep}>Ajouter une étape</button><button onClick={onDeleteStep}>Supprimer la dernière étape</button> */}
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
                    <input type="text" required/>
                    {/* <div className="ingredients">
                        <div className="ingredient">
                            <textarea placeholder="Ingrédient" name="" id="ingredients" cols="50" rows="2" required value={inputs.ingredients} onChange={onInputChange}></textarea>
                        </div>
                    </div> */}
                </label>
                {/* <button onClick={onAddIngredients}>Ajouter un ingrédient</button> */}

                <input type="submit" value="Ajouter la recette"/>
            </form>
    )
};

export default Add;