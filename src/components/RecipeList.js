import {Link} from 'react-router-dom'
import { useState } from 'react'
import {useTheme} from '../hooks/useTheme'
import deleteIcon from '../assets/delete-icon.svg'

import { Modal } from './Modal'


//styles
import './RecipeList.css'


export const RecipeList = ({recipes}) => {
  const [modal, setModal] = useState(false)
  const [modalId, setModalId] = useState('')
  
  const handleClick = (id) =>{
    setModal(true)
    setModalId(id)
  }
  
  const {mode} = useTheme()

  if (recipes.length === 0){
    return (<div>No results</div>)
  }

  
  
  return (
    <div className='recipe-list'>
      
        
        {recipes.map(
            (recipe)=>(<div className={`card ${mode}`} key={recipe.id}>
              
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime}</p>
                <div>{recipe.method.slice(0, 100)}...</div>
                <Link to={`/recipes/${recipe.id}`}>Cocinar </Link>
                <img src={deleteIcon} 
                  alt='delete recipe' 
                  className='delete'
                  onClick={()=>{handleClick(recipe.id)}}
                  />
                
               
                </div>
                
                ))}

        {modal &&  <Modal id={modalId} setModal={setModal}/>}
    </div>
  )
}
