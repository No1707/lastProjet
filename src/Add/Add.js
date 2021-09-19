import axios from "axios";
import { setIn } from "formik";
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
        ingredients: [{quantity: 0, unit: "", product: ""}],
        etapes: [""]
    })

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
            
            const i = val.target.dataset.index
            const newStep = inputs.etapes
            newStep[i] = theVal
            setInputs(e => {
                return { ...e, etapes: newStep}
            })
        } else {
            
            setInputs(e => {
                return { ...e, [name]: theVal }
            })
        }
    }

    const onIngredientChange = (val) => {
        const name = val.target.id
        const theVal = val.target.value
        const i = val.target.dataset.index

        switch(name){
            case "quantity":
                const newQuant = inputs.ingredients
                newQuant[i].quantity = theVal
                setInputs({ ...inputs, [inputs.ingredients]: newQuant })
                break
            case "unit":
                const newUnit = inputs.ingredients
                newUnit[i].unit = theVal
                setInputs({...inputs, [inputs.ingredients]: newUnit})
                break
            case "product":
                const newProd = inputs.ingredients
                newProd[i].product = theVal
                setInputs({ ...inputs, [inputs.ingredients]: newProd })
                break
        }

    }

    const onAddStep = (type) => {

        switch(type){
            case "step":
                const newStep = inputs.etapes
                newStep.push("")
                setInputs({ ...inputs, [inputs.etapes]: newStep })
                break
            case "ingredient":
                const newIngredient = inputs.ingredients
                newIngredient.push({quantity: 0, unit: "", product: ""})
                setInputs({ ...inputs, [inputs.ingredients]: newIngredient })
                console.log(inputs.ingredients)
                break
        }

    }

    const onDeleteStep = (type, i) => {

        switch(type){
            case "step": 
                const steps = inputs.etapes
                steps.splice(i, 1)
                setInputs({ ...inputs, [inputs.etapes]: steps, })
                break
            case "ingredient":
                const ingredients = inputs.ingredients
                ingredients.splice(i, 1)
                console.log(inputs.ingredients, ingredients)
                setInputs({ ...inputs, [inputs.ingredients]: ingredients, })
                break
        }

    }

    const onSubmit = (e) => {
        e.preventDefault()

        const finalIngredients = []

        inputs.ingredients.map((ingr) => {
            const quantUnit = ingr.quantity+ingr.unit
            const prod = ingr.product
            const res = [quantUnit, prod]
            finalIngredients.push(res)
        })

        console.log(finalIngredients)

        setInputs({ ...inputs, [inputs.ingredients]: finalIngredients})

        // if (inputs.photo) {
        //     const photoURL = inputs.photo.substr(0, 8)
        //     if (photoURL.includes("https://") || photoURL.includes("http://")) {
        //         axios.post("http://localhost:9000/api/recipes", inputs)
        //             .then(res => console.log(res)).catch(error => console.log(error))
        //     } else {
        //         alert("L'URL de la photo est incorrecte")
        //         document.querySelector(".inputPhoto").style.borderColor = "red"
        //     }
        // } else {
        //     axios.post("http://localhost:9000/api/recipes", inputs)
        //         .then(res => console.log(res)).catch(error => console.log(error))
        // }
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
                        {inputs.etapes && inputs.etapes.map( (val, i) => {
                            return(
                                <div className="step" key={i}>
                                    <textarea placeholder="Etape à suivre" className="inputStep" id="etapes" cols="50" rows="2" required value={inputs.etapes[i]} onChange={onInputChange} data-index={i} />
                                    <button type="button" onClick={() => onDeleteStep("step",i)}>X</button>
                                </div>
                            )
                        })}
                    </div>
                </label>
                <button type="button" onClick={() => onAddStep("step")}>Ajouter une étape</button>
                <label className="ingredients">
                    <span>Ingredients:</span>
                <div style={{ width: "100%" }}>
                    {inputs.ingredients && inputs.ingredients.map((val, i) =>
                            (
                                <div key={i}>
                                    <input id="quantity" data-index={i} type="number" onChange={onIngredientChange} value={inputs.ingredients[i].quantity} />
                            <select id="unit" data-index={i} className="mesure" onChange={onIngredientChange} value={inputs.ingredients[i].unit} >
                                        <option value="g">g</option>
                                        <option value="mg">mg</option>
                                        <option value="l">l</option>
                                        <option value="cl">cl</option>
                                        <option value=""></option>
                                    </select>
                            <input id="product" data-index={i} type="text" onChange={onIngredientChange} value={inputs.ingredients[i].product} required />
                                    <button type="button" onClick={() => onDeleteStep("ingredient", i)}>X</button>
                                </div>
                            )
                        )
                    }
                    </div>
                </label>
                <button type="button" onClick={() => onAddStep("ingredient")}>Ajouter un ingrédient</button>

                <input type="submit" value="Ajouter la recette"/>
            </form>
    )
};

export default Add;