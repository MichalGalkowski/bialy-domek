import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './AddInfo.css'

export default function AddInfo() {

    const { addDocument, response } = useFirestore('infos')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    // form field values
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
        
        const createdBy = { 
          displayName: user.displayName, 
          photoURL: user.photoURL,
          id: user.uid
        }
    
        const info = {
          name,
          details,
          createdBy
        }
    
        await addDocument(info)
        if (!response.error) {
          navigate('/')
        }
      }

    return (
        <div className='content'>
            <h2 className='pageTitle'>Dodaj informację</h2>
            <form className='addInfoForm' onSubmit={ handleSubmit }>
                <label>
                    <span>Nazwa:</span>
                    <input
                        required 
                        type="text"
                        maxLength={1000} 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Informacje:</span>
                    <textarea 
                        onChange={(e) => setDetails(e.target.value)}
                        value={details} 
                    ></textarea>
                </label>
                <button className="btn">Dodaj info</button>

                {formError && <p className="error">{formError}</p>}
            </form>
            
        </div>
    )
}