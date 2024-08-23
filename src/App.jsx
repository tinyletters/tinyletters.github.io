import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <h1>Tiny letters</h1>
      <div className="card">
        <p>
        Tiny letters for mothers is an artistic research project that aims to create a global network of data stories about the first 40 days / 6 weeks postpartum. The title tiny letters is borne of Dee Marco’s 40+day postpartum writing after the birth of her third child in 2023. Her candid and sometimes raw and scary recollections of the time set off a series of conversations that led to the best kind of working collaboration – one where mums work together. Dee and creative developer Lara Koseff embark on this journey of learning about global experiences of mothers by creating a data story through tiny letters from one mum to another, from one geography to another, from one illogical moment to another. 
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
