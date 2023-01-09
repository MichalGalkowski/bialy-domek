import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from "react"
import { useMediaQuery } from 'react-responsive';

import Avatar from "./Avatar"
import Hamburger from '../assets/hamburger.svg'

// styles
import './Sidebar.css'


export default function Sidebar() {

    const { user } = useAuthContext()
    const [hamburger, setHamburger] = useState(true)
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    const hamburgerClick = () => { hamburger ? setHamburger(false) : setHamburger(true) }
    const navClick = () => {isMobile ? setHamburger(false) : setHamburger(true)}

    return (
        <>
            <img className="hamburger" onClick={hamburgerClick} src={Hamburger} alt='=' />
            {hamburger && (
                <div className='sidebar'>
                    <div className='sidebarContent'>
                        <div className="user">
                            <NavLink onClick={navClick} to='/uzytkownik'>
                                <Avatar src={user.photoURL} />
                            </NavLink>
                            <p>{user.displayName}</p>
                        </div>
                        <nav className='links'>
                            <ul>
                                <li>
                                    <NavLink onClick={navClick} to='/'>
                                        <span>Informacje</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={navClick} to='/skladki'>
                                        <span>Składki</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={navClick} to='/sprzatanie'>
                                        <span>Sprzątanie</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={navClick} to='/zakupy'>
                                        <span>Zakupy</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={navClick} to='/dodajInfo'>
                                        <span>+ Dodaj Info</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={navClick} to='/dodajSkladke'>
                                        <span>+ Dodaj składkę</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>)}
        </>
    )
}
