
const Modify = () => {
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

export default Modify;