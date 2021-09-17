import { useState } from "react";
import './Add.css'

const Add = () => {
    
    const[inputs, setInputs] = useState({
        titre: "",
        description: "",
        photo: "",
        tempsPreparation: 0,
        personnes: 0,
        niveau: "",
        ingredients: [],
        etapes: []
    })

    const onInputChange = (val) => {
        const name = val.target.id
        const theVal = val.target.value

        setInputs(e => {
            return { ...e, [name]: theVal}
        })
    }

    const onAddStep = () => {
        const htmlSteps = Array.from(document.querySelectorAll(".step textarea"))

        if (htmlSteps[htmlSteps.length - 1].value.length < 20){
            alert("La dernière étape n'est pas assez remplie")
        } else {
            const divSteps = document.querySelector(".steps")
            const newDiv = document.createElement("div")
            newDiv.className = "step"
            newDiv.innerHTML = 
                `<textarea placeholder="Etape à suivre" name="" id="" cols="50" rows="2" required></textarea>
                <button onClick={onDeleteStep}>X</button>`
            divSteps.appendChild(newDiv)
        }
    }

    const onDeleteStep = (e) => {
        const htmlSteps = Array.from(document.querySelectorAll(".step textarea"))

        if(htmlSteps.length <= 1){
            return
        } else {
            const divSteps = document.querySelector(".steps")
            console.log(divSteps)
            // divSteps.removeChild(e.target.parentNode)
        }
    }

    const onAddIngredients = () => {

    }

    const onSubmit = () => {
    }

    const testFunction = () => {
        console.log({ ...inputs })
    }

    return(
        <>
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
                    <input placeholder="Niveau de difficulté" value={inputs.niveau} onChange={onInputChange} id="niveau" className="inputLevel" type="text" required />
                </label>
                <label>
                    <span>Description:</span>
                    <textarea placeholder="Décrivez la recette" value={inputs.description} onChange={onInputChange} id="description" className="inputDesc" cols="30" rows="10" required></textarea>
                </label>
                <label>
                    <span>Personnes:</span>
                    <input placeholder="Combien de parts" value={inputs.personnes} onChange={onInputChange} id="personnes" className="inputPeople" type="text" required />
                </label>
                <label>
                    <span>Temps de préparation:</span>
                    <input placeholder="Combien de temps" value={inputs.tempsPreparation} onChange={onInputChange} id="tempsPreparation" className="inputTime" type="text" required />
                </label>
                <label>
                    <span>Etapes:</span>
                    <div className="steps">
                        <div className="step">
                            <textarea placeholder="Etape à suivre" name="" id="" cols="50" rows="2" required></textarea>
                        </div>
                    </div>
                </label>
                <button onClick={onAddStep}>Ajouter une étape</button>
                <label>
                    <span>Etapes:</span>
                    <div className="ingredients">
                        <div className="ingredient">
                            <textarea placeholder="Ingrédient" name="" id="" cols="50" rows="2" required></textarea>
                        </div>
                    </div>
                </label>
                <button onClick={onAddIngredients}>Ajouter un ingrédient</button>

                <button onClick={testFunction}>bonjour</button>

                <input type="submit" />
            </form>
        </>
    )
};

export default Add;