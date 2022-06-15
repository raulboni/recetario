
//Styles
import './Searchbar.css'

import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { projectFirestore } from '../firebase/config'

export const Searchbar = () => {
const history = useHistory()
const [term, setTerm] = useState('')


const handleSubmit = (e) =>{
    e.preventDefault()
    history.push(`/search?q=${term}`)
}


  return (
    <div className='searchbar'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='search'>Buscar:</label>
            <input
            type='text'
            id='search'
            onChange={e=>setTerm(e.target.value)}
            value={term}
            required
            />

        </form>
    </div>
  )
}
