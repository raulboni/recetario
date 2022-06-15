
import {useTheme} from '../hooks/useTheme'
import sunIcon from '../assets/sun-icon.svg'

import './ThemeSelector.css'
const ThemeColors = ['#58249c', '#249c6b', '#b70233']

export const ThemeSelector = () => {

    const {changeColor, changeMode, mode} = useTheme()

    const toggleMode = () =>{
      changeMode(mode === 'light' ? 'dark' : 'light' )
    }

    console.log(mode)
  return (
    <div className='theme-selector'>
      <div className='mode-toggle'>
        <img
        alt='mode-icon'
        onClick={toggleMode} 
        src={sunIcon}
        style={{filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
        />
      </div>
        <div className='theme-buttons'>
            {ThemeColors.map(
                (color)=>
                
    
                 (<div 
                 key={color}
                 onClick={()=>{changeColor(color)}}
                 style={{background:color}}
                 />)   
                
            )}
        </div>
    </div>
  )
}
