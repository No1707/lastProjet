import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import Add from './Add/Add'
import Homepage from './Homepage/Homepage'
import Details from './Details/Details'
import Modify from './Modify/Modify'

function App() {

  const [showPopup, setShowPopup] = useState(false)

  return (
    <Router>
      <div className="App">

        <header>
          <div style={{visibility: "hidden"}}>Ajouter une recette</div>
          <Link style={{textDecoration: "none"}} to="/"><h1>Geek Recipes</h1></Link>
          <Link to="/add" className="recipeAdd">Ajouter une recette</Link>
        </header>

        <main>
          <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <Route exact path="/add" component={Add}></Route>
            <Route exact path="/recipe/:id" component={Details}></Route>
            <Route exact path="/recipe/modify/:id" component={Modify}></Route>
          </Switch>
        </main>

      </div>
    </Router>
  )
}

export default App
