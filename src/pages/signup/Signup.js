import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import './Signup.css'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)

    const { signup, isPending, error} = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(thumbnailError===null) {
        signup(email, password, displayName, thumbnail)}
    }

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)
    
        if (!selected) {
          setThumbnailError('Please select a file')
          return
        }
        if (!selected.type.includes('image')) {
          setThumbnailError('Selected file must be an image')
          return
        }
        if (selected.size > 5000000) {
          setThumbnailError('Image file size must be less than 5000kb')
          return
        }
        
        setThumbnailError(null)
        setThumbnail(selected)
        console.log('thumbnail updated')
      }

    return (
        <form onSubmit={handleSubmit} className='signupForm'>
            <h2>Rejestracja</h2>
            <label>
                <span>Imię:</span>
                <input required type="text" 
                onChange={(e) => { setDisplayName(e.target.value)}}
                value={displayName}
                />
            </label>
            <label>
                <span>email:</span>
                <input required type="email" 
                onChange={(e) => { setEmail(e.target.value)}}
                value={email}
                />
            </label>
            <label>
                <span>hasło:</span>
                <input required type="password" 
                onChange={(e) => { setPassword(e.target.value)}}
                value={password}
                />
            </label>
            <label>
                <span>Zdjęcie profilowe:</span>
                <input 
                required
                type="file"
                onChange={handleFileChange}
                />
                {thumbnailError && <div className="error">{thumbnailError}</div>}
            </label>
            {!isPending && <button className="btn">Zarejestruj się</button>}
            {isPending && <button className="btn" disabled>Czekaj</button>}
            {error && <p>{error}</p>}
        </form>
    )
}
