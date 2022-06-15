import './Create.css'
import deleteIcon from '../../assets/delete-icon.svg'
import {useTheme} from '../../hooks/useTheme'
import {useState, useRef, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {projectFirestore } from '../../firebase/config'



export const Create = () => {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredients, setNewIngredients] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientsInput = useRef(null)
  const history = useHistory()
  const {color, mode} = useTheme()

  

  const handleSubmit = (e)=>{
    e.preventDefault()
    const doc = {title, ingredients, method, cookingTime: cookingTime+' minutes'
    }

    try {
      projectFirestore.collection('recipes').add(doc)
      history.push('/')
      
    } catch(err){console.log(err)}
  }

  const handleAdd = (e)=>{
    e.preventDefault()
    const ingr = newIngredients.trim()
    if ( ingr && !ingredients.includes(ingr)) {
      setIngredients(prevIngr => [...prevIngr, ingr])
      setNewIngredients('')
    }
    ingredientsInput.current.focus()
  }

  return (
    <div className='create'>
      <h2 className={`page-title ${mode}`}>Nueva receta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span className={mode}>Título</span>
          <input
          type='text'
          onChange={(e)=>(setTitle(e.target.value))}
          value={title}
          required
          />
        </label>


        <label>
          <span className={mode}>Ingredientes</span>
          <div className='ingredients'>
            <input
            type='text'
            onChange={(e)=>((setNewIngredients(e.target.value)))}
            value={newIngredients}
            ref={ingredientsInput}
            />
            <button 
            className='btn'
            style={{background : color}}
            onClick={handleAdd}
            >Add</button>

        
            {ingredients.map(
              (ingr) =>(<div key={ingr}>{ingr} 
              <img
              src={deleteIcon}
              onClick={()=>(setIngredients(
                ingredients.filter(
                  (delIngr)=>(delIngr !== ingr)
                
              )))}
              />
              </div>)
            )}
          </div>

        </label>
        

        <label>
          <span className={mode}>Instrucciones</span>
          <textarea
          onChange={(e)=>(setMethod(e.target.value))}
          value={method}
          required
          />
        </label>

        <label>
          <span className={mode}>Tiempo (en minutos)</span>
          <input
          type='number'
          onChange={(e)=>(setCookingTime(e.target.value))}
          value={cookingTime}
          />
        </label>

        <button 
        style={{background : color}}
        className='button'>Submit</button>
      </form>
      </div>
  )
}
