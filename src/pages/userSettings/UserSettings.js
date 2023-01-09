import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { projectStorage } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'

// styles
import './UserSettings.css'

export default function UserSettings() {

    const { user } = useAuthContext()
    const navigate = useNavigate()
    const [displayName, setDisplayName] = useState(user.displayName)
    const [thumbnailError, setThumbnailError] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const { updateDocument, response } = useFirestore('users')
    const [isPending, setIsPending] = useState(false)

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
        if (selected.size > 100000) {
            setThumbnailError('Image file size must be less than 100kb')
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
        console.log('thumbnail updated')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsPending(true)
        if (thumbnail === null) {
            user.updateProfile({ displayName })
            updateDocument(user.uid, { displayName })
            setIsPending(false)
            setThumbnail(null)
            navigate('/')
        }
        else {
            const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgUrl = await img.ref.getDownloadURL()

            user.updateProfile({ displayName, photoURL: imgUrl })
            updateDocument(user.uid, { displayName, photoURL: imgUrl })
            setIsPending(false)
            setThumbnail(null)
            navigate('/')
        }
    }

    return (
        <div className='userSettings'>
            <div className='avatarBox'>
                <Avatar src={user.photoURL} />
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            required
                            type="text"
                            onChange={(e) => { setDisplayName(e.target.value) }}
                            value={displayName}
                        />
                    </label>
                    <label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                        />
                        {thumbnailError && <div className="error">{thumbnailError}</div>}
                    </label>
                    {!isPending && <button className="btn">Aktualizuj</button>}
                    {isPending && <button className="btn" disabled>Czekaj</button>}
                </form>
            </div>
            <div className='nameBox'>
            </div>
        </div>
    )
}
