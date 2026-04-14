import './Header.css'
import { NavLink } from 'react-router-dom'


export default function Header() {
  return (
    <header className="header">
      <div>
        <NavLink to="/City">City</NavLink> | <NavLink to="/HistorySearch">HistorySearch</NavLink> | <NavLink to ="About">About</NavLink>

      </div>
    </header>
  )
}
