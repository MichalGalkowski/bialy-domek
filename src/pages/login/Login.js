import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import './Login.css'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const{ login, isPending, error } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
        }

    return (
        <form onSubmit={handleSubmit} className='loginForm'>
            <h2>Zaloguj się</h2>
            <label>
                <span>email:</span>
                <input type="email"
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                />
            </label>
            <label>
                <span>hasło:</span>
                <input type="password"
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
                />
            </label>
            { !isPending && <button className='btn'>Zaloguj się</button> }
            { isPending && <button className='btn' disabled>Czekaj</button>}
            { error && <p>{error}</p>}
        </form>
    )
}
