import Avatar from '../components/Avatar'
import { useFirestore } from '../hooks/useFirestore'
import { useAuthContext } from '../hooks/useAuthContext'

// styles
import './InfoList.css'

import Delete from '../assets/delete.svg'

export default function InfoList({ infos }) {

    const { deleteDocument } = useFirestore('infos')
    const { user } = useAuthContext()

    return (
        <div className='content infoList'>
            {infos.length === 0 && <p>Brak informacji!</p>}
            {infos.map(info => (

                <div key={info.id} className='infoBox'>
                    <div className='infoHeading'>
                        <Avatar src={info.createdBy.photoURL} />
                        <h4>{info.name}</h4>
                        {user.uid === info.createdBy.id && (
                            <img className='deleteBtn' src={Delete} alt='delete' onClick={() => {deleteDocument(info.id)}} />
                        )}
                    </div>
                    <div>
                        <p>{info.details}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}