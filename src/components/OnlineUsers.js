import { useCollection } from '../hooks/useCollection'

// components
import Avatar from './Avatar'

// styles
import './OnlineUsers.css'

export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection('users')

  return (
    <div className="userList">
      <div className='usersContent'>
      <h2>Użytkownicy</h2>
      {isPending && <div>Czekaj...</div>}
      {error && <div>{error}</div>}
      {documents && documents.map(user => (
        <div key={user.id} className="userListItem">
          {user.online && <span className="onlineUser"></span>}
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
      </div>
    </div>
  )
}