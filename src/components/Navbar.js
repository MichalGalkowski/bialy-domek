import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'

// styles
import './Navbar.css'
import Logo from '../assets/logo.png'
import Settings from '../assets/settings.svg'

export default function Navbar() {

  const [admin, setAdmin] = useState(false)
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()


  useEffect(() => {
    try {
      if (user.uid === 'MKiU7WUD2hffDCA0erxBxgQikXu1' || user.uid === '8EPnIIqdtbMOF0yJ1xPGc1ywWcE2') {
        setAdmin(true)
      }
      else { setAdmin(false) }
    }
    catch (err) {

    }
  }, [user])

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <Link className='navLogo' to='/'>
            <img src={Logo} alt="fotoporcelana.net" />
            <h2 className='headtext'>
              Biały domek
            </h2>
          </Link>
        </li>

        {!user && (
          <>
            <li><Link to="/logowanie">Logowanie</Link></li>
            <li><Link to="/rejestracja">Rejestracja</Link></li>
          </>
        )}

        {user && (
          <>
            {admin && (
              <li>

                <Link className='navlink' to='/ustawienia'>
                  <img className='settings' src={Settings} alt='Settings' />
                </Link>
              </li>)}
            <li>
              {!isPending && <button className="btn" onClick={logout}>Wyloguj się</button>}
              {isPending && <button className="btn" disabled>Czekaj...</button>}
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
