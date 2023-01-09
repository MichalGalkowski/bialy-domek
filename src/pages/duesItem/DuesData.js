import React from 'react'
import { useState } from 'react'
import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

import Edit from '../../assets/edit.svg'
// styles
import './DuesItem.css'

export default function DuesData({ dues }) {

    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('dues')

    const [editPaidIn, setEditPaidIn] = useState(false)
    const [editPaidOut, setEditPaidOut] = useState(false)
    const [editDetails, setEditDetails] = useState(false)
    const [paidIn, setPaidIn] = useState(15)
    const [paidOut, setPaidOut] = useState('')
    const [details, setDetails] = useState(dues.details)

    const handleEditPaidIn = () => { editPaidIn ? setEditPaidIn(false) : setEditPaidIn(true) }
    const handleEditPaidOut = () => { editPaidOut ? setEditPaidOut(false) : setEditPaidOut(true) }
    const handleEditDetails = () => { editDetails ? setEditDetails(false) : setEditDetails(true) }


    const updatePaidIn = async () => {
        if (isNaN(parseFloat(paidIn).toFixed(2))) {
            setPaidIn('')
        }
        else {
            const deposit = {
                userId: user.uid,
                userName: user.displayName,
                photoURL: user.photoURL,
                name: 'wpłata',
                amount: paidIn,
                id: Math.random()
            }
            let updatedStock = parseFloat(dues.stock) + parseFloat(paidIn)

            await updateDocument(dues.id, {
                deposits: [...dues.deposits, deposit],
                stock: "" + updatedStock.toFixed(2),
            })
            if (!response.error) {
                setPaidIn('')
                setEditPaidIn(false)
            }
        }
    }
    const updatePaidOut = async () => {
        if (isNaN(parseFloat(paidOut).toFixed(2))) {
            setPaidOut('')
            setEditPaidOut(false)
        }
        else {
            const withdrawal = {
                userId: user.uid,
                userName: user.displayName,
                photoURL: user.photoURL,
                name: 'wypłata',
                amount: paidOut,
                id: Math.random()
            }
            let updatedStock = parseFloat(dues.stock) - parseFloat(paidOut)

            await updateDocument(dues.id, {
                withdrawals: [...dues.withdrawals, withdrawal],
                stock: "" + updatedStock.toFixed(2),
            })
            if (!response.error) {
                setPaidOut('')
                setEditPaidOut(false)
            }
        }
    }
    const updateDetails = async () => {
        await updateDocument(dues.id, { details })
    }
    const paidInAmount = (userId) => {
        let amount = 0
        let amountIn = 0
        let amountOut = 0
        dues.deposits.map(deposit => {
            if (deposit.userId === userId) {
                amountIn = parseFloat(amountIn) + parseFloat(deposit.amount)
            }
        })
        dues.withdrawals.map(withdrawal => {
            if (withdrawal.userId === userId) {
                amountOut = parseFloat(amountOut) + parseFloat(withdrawal.amount)
            }
        })
        amount = parseFloat(amountIn) - parseFloat(amountOut)
        return amount.toFixed(2)
    }
    const paidOutAmount = (userId) => {
        let amount = 0
        let amountIn = 0
        let amountOut = 0
        dues.deposits.map(deposit => {
            if (deposit.userId === userId) {
                amountIn = parseFloat(amountIn) + parseFloat(deposit.amount)
            }
        })
        dues.withdrawals.map(withdrawal => {
            if (withdrawal.userId === userId) {
                amountOut = parseFloat(amountOut) + parseFloat(withdrawal.amount)
            }
        })
        amount = parseFloat(amountIn) - parseFloat(dues.amount)
        amount = parseFloat(amount) - parseFloat(amountOut)
        return amount.toFixed(2)
    }

    const userCheck = (id) => {
        if (user.uid === id) {
            return true
        }
        else {
            return false
        }
    }

    return (
        <div className='duesContent'>
            <div className="duesBox">
                <h2 className="pageTitle">{dues.name}</h2>
                <div className='duesData'>
                    <p>Kwota do wpłaty: {dues.amount} zł</p>
                    <p>Suma: {dues.stock} zł</p>
                </div>
                <div>
                    {dues.assignedUsersList.map(user => (
                        <li key={user.id}>
                            <div className='userBox'>
                                <Avatar src={user.photoURL} />
                                <p><strong>{user.displayName}</strong></p>
                            </div>
                            <div className='paymentData'>
                                <div className='pay'>
                                    <p>Wpłacone: {paidInAmount(user.id)}</p>
                                    {userCheck(user.id) &&
                                        <div>
                                            <img className='editBtn' src={Edit} alt='edit' onClick={handleEditPaidIn} />
                                        </div>
                                    }
                                    {editPaidIn && userCheck(user.id) &&
                                        <div className='updateItem'>
                                            <input
                                                type="number"
                                                maxLength={1000}
                                                onChange={(e) => setPaidIn(e.target.value)}
                                                value={paidIn}
                                            />
                                            <button onClick={updatePaidIn} className='btn'>OK</button>

                                        </div>
                                    }
                                </div>
                                <div className='pay'>
                                    <p>Do wypłacenia: {paidOutAmount(user.id)}</p>
                                    {userCheck(user.id) &&
                                        <div>
                                            <img className='editBtn' src={Edit} alt='edit' onClick={handleEditPaidOut} />
                                        </div>
                                    }
                                    {editPaidOut && userCheck(user.id) &&
                                        <div className='updateItem'>
                                            <input
                                                className='inputNumber'
                                                type="number"
                                                maxLength={1000}
                                                onChange={(e) => setPaidOut(e.target.value)}
                                                value={paidOut}
                                            />
                                            <button onClick={updatePaidOut} className='btn'>OK</button>

                                        </div>
                                    }
                                </div>
                            </div>
                        </li>
                    ))}
                </div>
                <div className='infoContent'>
                    <h4>Informacje:</h4>
                    <img className='editBtn' src={Edit} alt='edit' onClick={handleEditDetails} />
                </div>
                <p className='infoDetails'>{dues.details}</p>
                {editDetails &&
                    <div className='updateItem'>
                        <div className='updateInput'>
                            <textarea
                                maxLength={12000}
                                onChange={(e) => setDetails(e.target.value)}
                                value={details}
                            ></textarea>
                            <button onClick={updateDetails} className='btn'>Aktualizuj</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
