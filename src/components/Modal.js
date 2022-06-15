import './Modal.css'
import {projectFirestore } from '../firebase/config'

export const Modal = ({id, setModal}) => {


    const handleClick = (id)=>{
        projectFirestore.collection('recipes').doc(id).delete()
        setModal(false)
       }


  return (
    <div className='modal'>
        <p>¿Seguro que quieres borrar esta receta tan rica?</p>
        <div
        onClick={()=>(handleClick(id))}>Sí</div>
        <div
        onClick={()=>(setModal(false))}>No</div>
    </div>
  )
}
