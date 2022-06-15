import './Search.css'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
import {RecipeList} from '../../components/RecipeList'

export const Search = () => {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  const [data, setData] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').onSnapshot(snapshot => {
      if (snapshot.empty) {
        setError('No recipes to load')
        setIsPending(false)
        setData(false)
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id })
        })
        setData(results.filter((result)=>{
          return result.title.toLowerCase().includes(query.toLowerCase()) === true
        }
        ))
        setIsPending(false)
      }
    }, err => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()

  }, [])


    
  return (
    <div>
      <h2 className='page-title'>Recipes including "{query}"</h2>
      {isPending && <p className='loading'>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      {data && <RecipeList recipes={data}/>}
      
    </div>
  )
}
