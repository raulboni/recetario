import {Link} from 'react-router-dom'
import {useTheme} from '../hooks/useTheme'
import { Searchbar } from './Searchbar'


//styles
import './Navbar.css'



export const Navbar = () => {
  const { color} = useTheme()
  return (
    <div className='navbar' style={{background: color}}>
        <nav>
            <Link className='brand' to='/'>
            <h1>Recetario</h1>
            </Link>
            <Searchbar/>
            <Link to='/create'>
            Crear receta
            </Link>
        </nav>
    </div>
  )
}
