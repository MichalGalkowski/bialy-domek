import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { useFirestore } from '../hooks/useFirestore'
import { useAuthContext } from '../hooks/useAuthContext'

// styles
import './DuesList.css'

import Delete from '../assets/delete.svg'

export default function DuesList({ dues }) {

    const { deleteDocument } = useFirestore('dues')
    const { user } = useAuthContext()

    return (
        <div className='content duesList'>
            {dues.length === 0 && <p>Brak składek!</p>}
            {dues.map(dues => (

                <div key={dues.id} className='duesBox'>
                    <div className='duesHeading'>
                        <h4>{dues.name}</h4>
                        {user.uid === dues.createdBy.id && (
                            <img className='deleteBtn' src={Delete} alt='delete' onClick={() => { deleteDocument(dues.id) }} />
                        )}
                    </div>
                    <div className='duesData'>
                        <p>Kwota do wpłaty: {dues.amount} zł</p>
                        <p>Suma: {dues.stock} zł</p>
                    </div>
                    <div className='duesUsers'>
                        {dues.assignedUsersList.map(user => (
                            <li className='userWrap' key={user.id}>
                                <Avatar src={user.photoURL} />
                            </li>
                        ))}
                    </div>
                    <div>
                        <p>Informacje:</p>
                        <p>{dues.details}</p>
                    </div>
                    <Link to={`/skladki/${dues.id}`} key={dues.id}>
                        <button className='btn'>Otwórz</button>
                    </Link>
                </div>
            ))}
        </div>
    )
}
