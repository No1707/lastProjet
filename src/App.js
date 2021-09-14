import { BrowserRouter, Link } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

import Add from './views/add'
import Detail from './views/detail'
import Modify from './views/modify'
import Recipe from './Recipe/Recipe'

function App() {

  const [recettes, setRecettes] = useState(null)

  useEffect(() => {
    fetch("http://localhost:9000/api/recipes")
      .then(res => res.json())
      .then(recipes => {
        setRecettes(recipes)
      })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">

        <header>
          <h1>Geek Recipes</h1>
          
          <Link to="/add">Ajouter une recette</Link>
        </header>

        <main>
          {recettes && recettes.map( (recette) => {
            return(
              <Recipe key={recette.id} recette={recette} />
            )
          })}
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App
