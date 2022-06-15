import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'
import {RecipeList} from '../../components/RecipeList'

// styles
import './Home.css'

export function Home() {
  const [data, setData] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  console.log(data)

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
        setData(results)
        setIsPending(false)
      }
    }, err => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()

  }, [])

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}