import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import Select from 'react-select'

// styles
import './AddDues.css'

export default function AddDues() {

    const { addDocument, response } = useFirestore('dues')
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])
    const { user } = useAuthContext()
    const navigate = useNavigate()

    // form field values
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('15')
    const [details, setDetails] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    // create user values for react-select
    useEffect(() => {
        if(documents) {
        setUsers(documents.map(user => {
            return { value: {...user, id: user.id}, label: user.displayName }
        }))
        }
    }, [documents])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
    
        const assignedUsersList = assignedUsers.map(u => {
          return { 
            displayName: u.value.displayName, 
            photoURL: u.value.photoURL,
            id: u.value.id,
          }
        })
        
        const createdBy = { 
          displayName: user.displayName, 
          photoURL: user.photoURL,
          id: user.uid
        }
    
        const due = {
          name,
          details,
          amount,
          stock: "0",
          assignedUsersList,
          deposits: [],
          withdrawals: [],
          createdBy
        }
    
        await addDocument(due)
        if (!response.error) {
          navigate('/skladki')
        }
      }

    return (
        <div className='content'>
            <h2 className='pageTitle'>Dodaj składkę</h2>
            <form className='addDueForm' onSubmit={ handleSubmit }>
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
                    <span>Kwota:</span>
                    <input
                        required 
                        type="number"
                        min={0}
                        max={1000}
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                <label>
                    <span>Użytkownicy:</span>
                    <Select
                        placeholder='Wybierz...'
                        onChange={(option) => setAssignedUsers(option)}
                        options={users}
                        isMulti
                    />
                </label>
                <label>
                    <span>Informacje:</span>
                    <textarea 
                        onChange={(e) => setDetails(e.target.value)}
                        value={details} 
                    ></textarea>
                </label>
                <button className="btn">Dodaj składkę</button>

                {formError && <p className="error">{formError}</p>}
            </form>
            
        </div>
    )
}
