import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar'
import Select from 'react-select'

import Edit from '../../assets/edit.svg'

// styles
import './Settings.css'

export default function Settings() {

    const { updateDocument, response } = useFirestore('users')

    const [aOne, setAOne] = useState('')
    const [aOneAvatar, setAOneAvatar] = useState('')
    const [aTwo, setATwo] = useState('')
    const [aTwoAvatar, setATwoAvatar] = useState('')
    const [aThree, setAThree] = useState('')
    const [aThreeAvatar, setAThreeAvatar] = useState('')
    const [bOne, setBOne] = useState('')
    const [bOneAvatar, setBOneAvatar] = useState('')
    const [bTwo, setBTwo] = useState('')
    const [bTwoAvatar, setBTwoAvatar] = useState('')
    const [bThree, setBThree] = useState('')
    const [bThreeAvatar, setBThreeAvatar] = useState('')
    const [assignedUser, setAssignedUser] = useState('')

    const [editOneA, setEditOneA] = useState(false)
    const [editTwoA, setEditTwoA] = useState(false)
    const [editThreeA, setEditThreeA] = useState(false)
    const [editOneB, setEditOneB] = useState(false)
    const [editTwoB, setEditTwoB] = useState(false)
    const [editThreeB, setEditThreeB] = useState(false)

    const [users, setUsers] = useState([])
    const { documents } = useCollection('users')
    useEffect(() => {
        if (documents) {
            setUsers(documents.map(user => {
                return { value: { ...user, id: user.id }, label: user.displayName }
            }))
            documents.map(u => {
                if (u.team) {
                    if (u.index === 1) {
                        setAOne(u.displayName)
                        setAOneAvatar(u.photoURL)
                    }
                    else if (u.index === 2) {
                        setATwo(u.displayName)
                        setATwoAvatar(u.photoURL)
                    }
                    else if (u.index === 3) {
                        setAThree(u.displayName)
                        setAThreeAvatar(u.photoURL)
                    }
                }
                else if (!u.team) {
                    if (u.index === 1) {
                        setBOne(u.displayName)
                        setBOneAvatar(u.photoURL)
                    }
                    else if (u.index === 2) {
                        setBTwo(u.displayName)
                        setBTwoAvatar(u.photoURL)
                    }
                    else if (u.index === 3) {
                        setBThree(u.displayName)
                        setBThreeAvatar(u.photoURL)
                    }
                }
            })
        }
    }, [documents])

    const handleEditOneA = () => { editOneA ? setEditOneA(false) : setEditOneA(true) }
    const handleEditTwoA = () => { editTwoA ? setEditTwoA(false) : setEditTwoA(true) }
    const handleEditThreeA = () => { editThreeA ? setEditThreeA(false) : setEditThreeA(true) }
    const handleEditOneB = () => { editOneB ? setEditOneB(false) : setEditOneB(true) }
    const handleEditTwoB = () => { editTwoB ? setEditTwoB(false) : setEditTwoB(true) }
    const handleEditThreeB = () => { editThreeB ? setEditThreeB(false) : setEditThreeB(true) }

    const updateUserOneA = async () => {
        await updateDocument(assignedUser.value.id, {
            team: true,
            index: 1,
        })
        if (!response.error) {
            setAssignedUser('')
            setEditOneA(false)
        }

    }
    const updateUserTwoA = async () => {
        await updateDocument(assignedUser.value.id, {
            team: true,
            index: 2,
        })
        if (!response.error) {
            setAssignedUser('')
            setEditTwoA(false)
        }

    }
    const updateUserThreeA = async () => {
        await updateDocument(assignedUser.value.id, {
            team: true,
            index: 3,
        })
        if (!response.error) {
            setAssignedUser('')
            setEditThreeA(false)
        }

    }
    const updateUserOneB = async () => {
        await updateDocument(assignedUser.value.id, {
            team: false,
            index: 1,
        })
        if (!response.error) {
            setAssignedUser('')
            setEditOneB(false)
        }

    }
    const updateUserTwoB = async () => {
        await updateDocument(assignedUser.value.id, {
            team: false,
            index: 2,
        })
        if (!response.error) {
            setAssignedUser('')
            setEditTwoB(false)
        }

    }
    const updateUserThreeB = async () => {
        await updateDocument(assignedUser.value.id, {
            team: false,
            index: 3,
        })
        if (!response.error) {
            setAssignedUser('')
            setEditThreeB(false)
        }

    }

    return (
        <div className='content'>
            <div className='teamWrap'>
                <div className='teamHeader'>
                    <h4>Team A</h4>
                </div>
                <div className='teamTable'>
                    <div className='column'>
                        <div className='index'>
                            <h4>Kuchnia, salon, śmieci</h4>
                            <img className='editBtn' src={Edit} alt='edit' onClick={handleEditOneA} />
                        </div>
                        <div className='tableField'>
                            {!editOneA &&
                                <div className='tableValue'>
                                    <Avatar src={aOneAvatar} />
                                    <p>{aOne}</p>
                                </div>
                            }
                            {editOneA &&
                                <div className='tableValue'>
                                    <Select
                                        onChange={(option) => setAssignedUser(option)}
                                        options={users}
                                    />
                                    <button onClick={updateUserOneA} className='btn'>OK</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='column'>
                        <div className='index'>
                            <h4>Łazienki doł, wiatrołap, pranie</h4>
                            <img className='editBtn' src={Edit} alt='edit' onClick={handleEditTwoA} />
                        </div>
                        <div className='tableField'>
                            {!editTwoA &&
                                <div className='tableValue'>
                                    <Avatar src={aTwoAvatar} />
                                    <p>{aTwo}</p>
                                </div>
                            }
                            {editTwoA &&
                                <div className='tableValue'>
                                    <Select
                                        onChange={(option) => setAssignedUser(option)}
                                        options={users}
                                    />
                                    <button onClick={updateUserTwoA} className='btn'>OK</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='column'>
                        <div className='index'>
                            <h4>Łazienka góra, schody</h4>
                            <img className='editBtn' src={Edit} alt='edit' onClick={handleEditThreeA} />
                        </div>
                        <div className='tableField'>
                            {!editThreeA &&
                                <div className='tableValue'>
                                    <Avatar src={aThreeAvatar} />
                                    <p>{aThree}</p>
                                </div>
                            }
                            {editThreeA &&
                                <div className='tableValue'>
                                    <Select
                                        onChange={(option) => setAssignedUser(option)}
                                        options={users}
                                    />
                                    <button onClick={updateUserThreeA} className='btn'>OK</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='teamHeader'>
                    <h4>Team B</h4>
                </div>
                <div className='teamTable'>
                    <div className='column'>
                        <div className='index'>
                            <h4>Kuchnia, salon, śmieci</h4>
                            <img className='editBtn' src={Edit} alt='edit' onClick={handleEditOneB} />
                        </div>
                        <div className='tableField'>
                            {!editOneB &&
                                <div className='tableValue'>
                                    <Avatar src={bOneAvatar} />
                                    <p>{bOne}</p>
                                </div>
                            }
                            {editOneB &&
                                <div className='tableValue'>
                                    <Select
                                        onChange={(option) => setAssignedUser(option)}
                                        options={users}
                                    />
                                    <button onClick={updateUserOneB} className='btn'>OK</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='column'>
                        <div className='index'>
                            <h4>Łazienki doł, wiatrołap, pranie</h4>
                            <img className='editBtn' src={Edit} alt='edit' onClick={handleEditTwoB} />
                        </div>
                        <div className='tableField'>
                            {!editTwoB &&
                                <div className='tableValue'>
                                    <Avatar src={bTwoAvatar} />
                                    <p>{bTwo}</p>
                                </div>
                            }
                            {editTwoB &&
                                <div className='tableValue'>
                                    <Select
                                        onChange={(option) => setAssignedUser(option)}
                                        options={users}
                                    />
                                    <button onClick={updateUserTwoB} className='btn'>OK</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='column'>
                        <div className='index'>
                            <h4>Łazienka góra, schody</h4>
                            <img className='editBtn' src={Edit} alt='edit' onClick={handleEditThreeB} />
                        </div>
                        <div className='tableField'>
                            {!editThreeB &&
                                <div className='tableValue'>
                                    <Avatar src={bThreeAvatar} />
                                    <p>{bThree}</p>
                                </div>
                            }
                            {editThreeB &&
                                <div className='tableValue'>
                                    <Select
                                        onChange={(option) => setAssignedUser(option)}
                                        options={users}
                                    />
                                    <button onClick={updateUserThreeB} className='btn'>OK</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
