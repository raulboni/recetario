import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useTheme} from '../../hooks/useTheme'
import {projectFirestore } from '../../firebase/config'

//styles
import './Recipe.css'


export const Recipe = () => {

  const {mode} = useTheme()

  const { id } = useParams();
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  

  useEffect(()=>{
    setIsPending(true)
    
    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc)=>{
      if (doc.exists){
        setIsPending(false)
        setRecipe(doc.data())
      } else{
        setIsPending(false)
        setError('Could not find recipe')
      }
    })
   return ()=> unsub()
  }, [id])
  
  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'> {error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          
          <ul>
          {recipe.ingredients.map(
            (ingr)=>(<li key={ingr}>{ingr}</li>)
          )}
          </ul>
          <p className='method'>{recipe.method}</p>
          
        </>
      )}
    </div>
  )
}
