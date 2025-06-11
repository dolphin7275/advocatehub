
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    
    <div>

      {/* Logo */}
      <img src='' alt='logo' />
      
      {/* Refers */}
      <div>

        <ul>

          <li>
            <NavLink to='/'> Home </NavLink>
          </li>

          <li>
            <NavLink to='/featured'> About </NavLink>
          </li>

        </ul>

      </div>

    </div>
  )
}

export default Navbar
