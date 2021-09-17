
const Delete = (i) => {

    const id = i

    const deleteRecipe = () => {
        fetch("http://localhost:9000/api/recipe/" + id, {
            method: 'DELETE'
        }).then(res => res.json()).then(data => console.log(data))
    }

    return(
        <>
            <button onClick={deleteRecipe}>Supprimer</button>
        </>
    )
};

export default Delete;