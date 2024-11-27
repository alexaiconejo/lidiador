/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css'
import { Link } from "react-router-dom";
import Galaxia from "./components/Galaxia/Galaxia.jsx";
import Red from "./components/Red/Red.jsx"

function App() {
  return (
    <>
          <Red></Red>
    <Galaxia>

    </Galaxia>
      <h1>Lidiador</h1>
      <h3>Arte disidente</h3>

      <Link to='/crear'>
<h4>crear</h4>
</Link>
    </>
  )
}

export default App
