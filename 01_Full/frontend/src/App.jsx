import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
 const [jokes,setjokes]=useState([])

 useEffect(()=>{
  axios.get('/api/jokes')
  .then((response)=>{
      setjokes(response.data)
  })
  .catch((e)=>{
      console.error("Error fetching jokes:", e)
  })
 })

  return (
    <>
    <div>
      <h1>Jokes </h1>
      <p>JOKES:{jokes.length}</p>
    </div>

    {
      jokes.map((joke)=>(
        <div key={joke.id}>
          <h2>{joke.title}</h2>
          <p>{joke.context}</p>  
        </div>
      ))
    }


    </>
  )
  
}

export default App
