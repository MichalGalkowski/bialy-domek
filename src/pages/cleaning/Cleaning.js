import React, { useEffect, useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useSecondCollection } from '../../hooks/useSecondCollection'
import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

// styles
import './Cleaning.css'

import Next from '../../assets/next.svg'
import Done from '../../assets/done.svg'
import Not from '../../assets/delete.svg'
import Expend from '../../assets/expend.svg'
import Collapse from '../../assets/collapse.svg'

export default function Cleaning() {

    const { user } = useAuthContext()
    const { updateDocument } = useFirestore('cleaning')
    const { updateDoc } = useFirestore('users')
    const [users, setUsers] = useState([])

    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())
    const [taskOne, setTaskOne] = useState('')
    const [taskOneID, setTaskOneID] = useState('')
    const [taskOneAvatar, setTaskOneAvatar] = useState('')
    const [taskOneBool, setTaskOneBool] = useState(false)
    const [taskTwo, setTaskTwo] = useState('')
    const [taskTwoID, setTaskTwoID] = useState('')
    const [taskTwoAvatar, setTaskTwoAvatar] = useState('')
    const [taskTwoBool, setTaskTwoBool] = useState(false)
    const [taskThree, setTaskThree] = useState('')
    const [taskThreeID, setTaskThreeID] = useState('')
    const [taskThreeAvatar, setTaskThreeAvatar] = useState('')
    const [taskThreeBool, setTaskThreeBool] = useState(false)
    const [group, setGroup] = useState(false)
    const [taskFour, setTaskFour] = useState('')
    const [taskFourAvatar, setTaskFourAvatar] = useState('')
    const [taskFive, setTaskFive] = useState('')
    const [taskFiveAvatar, setTaskFiveAvatar] = useState('')
    const [taskSix, setTaskSix] = useState('')
    const [taskSixAvatar, setTaskSixAvatar] = useState('')
    const [showGraph, setShowGraph] = useState(false)
    const [admin, setAdmin] = useState(false)

    let dateFromDay, dateFromDayOne, dateFromDayTwo, dateFromDayThree, dateFromDayFour, dateFromDayFive
    let dateFromMonth, dateFromMonthOne, dateFromMonthTwo, dateFromMonthThree, dateFromMonthFour, dateFromMonthFive
    let dateToDay, dateToDayOne, dateToDayTwo, dateToDayThree, dateToDayFour, dateToDayFive
    let dateToMonth, dateToMonthOne, dateToMonthTwo, dateToMonthThree, dateToMonthFour, dateToMonthFive

    const addDays = (date, days) => {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    }

    const { docs } = useSecondCollection('users')
    useEffect(() => {
        if (docs) {
            setUsers(docs.map(user => {
                return { value: { ...user, id: user.id }, label: user.displayName }
            }))
        }
    }, [docs])

    const { documents } = useCollection('cleaning')
    useEffect(() => {
        if (documents) {
            documents.map(document => {
                setDateFrom(document.dateFrom.toDate())
                setDateTo(document.dateTo.toDate())
                setTaskOne(document.taskOne.displayName)
                setTaskOneID(document.taskOne.id)
                setTaskOneAvatar(document.taskOne.photoURL)
                setTaskOneBool(document.taskOneDone)
                setTaskTwo(document.taskTwo.displayName)
                setTaskTwoID(document.taskTwo.id)
                setTaskTwoAvatar(document.taskTwo.photoURL)
                setTaskTwoBool(document.taskTwoDone)
                setTaskThree(document.taskThree.displayName)
                setTaskThreeID(document.taskThree.id)
                setTaskThreeAvatar(document.taskThree.photoURL)
                setTaskThreeBool(document.taskThreeDone)
                setTaskFour(document.taskFour.displayName)
                setTaskFourAvatar(document.taskFour.photoURL)
                setTaskFive(document.taskFive.displayName)
                setTaskFiveAvatar(document.taskFive.photoURL)
                setTaskSix(document.taskSix.displayName)
                setTaskSixAvatar(document.taskSix.photoURL)
                setGroup(document.group)
            })
        }
    }, [documents])
    try {
        let dateOne = addDays(dateFrom, 7)
        let dateTwo = addDays(dateFrom, 14)
        let dateThree = addDays(dateFrom, 21)
        let dateFour = addDays(dateFrom, 28)
        let dateFive = addDays(dateFrom, 35)
        let dateOneTo = addDays(dateTo, 7)
        let dateTwoTo = addDays(dateTo, 14)
        let dateThreeTo = addDays(dateTo, 21)
        let dateFourTo = addDays(dateTo, 28)
        let dateFiveTo = addDays(dateTo, 35)
        dateFromDay = ("0" + dateFrom.getDate()).slice(-2)
        dateFromMonth = ("0" + (dateFrom.getMonth() + 1)).slice(-2)
        dateFromDayOne = ("0" + dateOne.getDate()).slice(-2)
        dateFromMonthOne = ("0" + (dateOne.getMonth() + 1)).slice(-2)
        dateFromDayTwo = ("0" + dateTwo.getDate()).slice(-2)
        dateFromMonthTwo = ("0" + (dateTwo.getMonth() + 1)).slice(-2)
        dateFromDayThree = ("0" + dateThree.getDate()).slice(-2)
        dateFromMonthThree = ("0" + (dateThree.getMonth() + 1)).slice(-2)
        dateFromDayFour = ("0" + dateFour.getDate()).slice(-2)
        dateFromMonthFour = ("0" + (dateFour.getMonth() + 1)).slice(-2)
        dateFromDayFive = ("0" + dateFive.getDate()).slice(-2)
        dateFromMonthFive = ("0" + (dateFive.getMonth() + 1)).slice(-2)
        dateToDay = ("0" + dateTo.getDate()).slice(-2)
        dateToMonth = ("0" + (dateTo.getMonth() + 1)).slice(-2)
        dateToDayOne = ("0" + dateOneTo.getDate()).slice(-2)
        dateToMonthOne = ("0" + (dateOneTo.getMonth() + 1)).slice(-2)
        dateToDayTwo = ("0" + dateTwoTo.getDate()).slice(-2)
        dateToMonthTwo = ("0" + (dateTwoTo.getMonth() + 1)).slice(-2)
        dateToDayThree = ("0" + dateThreeTo.getDate()).slice(-2)
        dateToMonthThree = ("0" + (dateThreeTo.getMonth() + 1)).slice(-2)
        dateToDayFour = ("0" + dateFourTo.getDate()).slice(-2)
        dateToMonthFour = ("0" + (dateFourTo.getMonth() + 1)).slice(-2)
        dateToDayFive = ("0" + dateFiveTo.getDate()).slice(-2)
        dateToMonthFive = ("0" + (dateFiveTo.getMonth() + 1)).slice(-2)
    }
    catch (err) {

    }

    const handleFieldOne = async () => {
        if (taskOneID === user.uid || admin) {
            taskOneBool ? await updateDocument('data', { taskOneDone: false }) : await updateDocument('data', { taskOneDone: true })
        }
    }
    const handleFieldTwo = async () => {
        if (taskTwoID === user.uid || admin) {
            taskTwoBool ? await updateDocument('data', { taskTwoDone: false }) : await updateDocument('data', { taskTwoDone: true })
        }
    }
    const handleFieldThree = async () => {
        if (taskThreeID === user.uid || admin) {
            taskThreeBool ? await updateDocument('data', { taskThreeDone: false }) : await updateDocument('data', { taskThreeDone: true })
        }
    }
    const handleNext = async () => {

        if (admin && taskOneBool && taskTwoBool && taskThreeBool) {
            let days = 7
            setDateFrom(dateFrom.setDate(dateFrom.getDate() + days))
            setDateTo(dateTo.setDate(dateTo.getDate() + days))
            users.map(u => {
                if (group) {
                    if (u.value.team) {
                        let i = u.value.index
                        if (i === 3) {
                            updateDoc(u.value.id, { index: 1 })
                        } else {
                            i++
                            updateDoc(u.value.id, { index: i })
                        }
                    }
                    updateDocument('data', {
                        dateFrom: dateFrom,
                        dateTo: dateTo,
                        taskOneDone: false,
                        taskTwoDone: false,
                        taskThreeDone: false,
                        group: false,
                    })
                    users.map(u => {
                        if (!u.value.team) {
                            let i = u.value.index
                            if (i === 1) {
                                updateDocument('data', {
                                    taskOne: u.value,
                                })
                            }
                            else if (i === 2) {
                                updateDocument('data', {
                                    taskTwo: u.value,
                                })
                            }
                            else if (i === 3) {
                                updateDocument('data', {
                                    taskThree: u.value,
                                })
                            }
                        }
                        else if (u.value.team) {
                            let i = u.value.index
                            if (i === 1) {
                                updateDocument('data', {
                                    taskFour: u.value,
                                })
                            }
                            else if (i === 2) {
                                updateDocument('data', {
                                    taskFive: u.value,
                                })
                            }
                            else if (i === 3) {
                                updateDocument('data', {
                                    taskSix: u.value,
                                })
                            }
                        }
                    })
                }
                else if (!group) {
                    if (!u.value.team) {
                        let i = u.value.index
                        if (i === 3) {
                            updateDoc(u.value.id, { index: 1 })
                        } else {
                            i++
                            updateDoc(u.value.id, { index: i })
                        }
                    }
                    updateDocument('data', {
                        dateFrom: dateFrom,
                        dateTo: dateTo,
                        taskOneDone: false,
                        taskTwoDone: false,
                        taskThreeDone: false,
                        group: true,
                    })
                    users.map(u => {
                        if (u.value.team) {
                            let i = u.value.index
                            if (i === 1) {
                                updateDocument('data', {
                                    taskOne: u.value,
                                })
                            }
                            else if (i === 2) {
                                updateDocument('data', {
                                    taskTwo: u.value,
                                })
                            }
                            else if (i === 3) {
                                updateDocument('data', {
                                    taskThree: u.value,
                                })
                            }
                        }
                        else if (!u.value.team) {
                            let i = u.value.index
                            if (i === 1) {
                                updateDocument('data', {
                                    taskFour: u.value,
                                })
                            }
                            else if (i === 2) {
                                updateDocument('data', {
                                    taskFive: u.value,
                                })
                            }
                            else if (i === 3) {
                                updateDocument('data', {
                                    taskSix: u.value,
                                })
                            }
                        }
                    })
                }
            })
        }
    }

    useEffect(() => {
        try {
            if (user.uid === 'MKiU7WUD2hffDCA0erxBxgQikXu1' || user.uid === '8EPnIIqdtbMOF0yJ1xPGc1ywWcE2') {
                setAdmin(true)
            }
            else { setAdmin(false) }
        }
        catch (err) {

        }
    }, [user])

    return (
        <div className='content'>
            <div className='cleaningWrap'>
                <div className='cleaningHeader'>
                    <h4>Grafik sprzątania</h4>
                    <p className='cleaningData'>{dateFromDay + "/" + dateFromMonth} - {dateToDay + "/" + dateToMonth}</p>
                    <img onClick={handleNext} className='nextBtn' src={Next} alt='next' />
                </div>
                <div className='cleaningTable'>
                    <div className='column'>
                        <h4>Kuchnia, salon, śmieci</h4>
                        <div onClick={handleFieldOne} className='tableField'>
                            <Avatar src={taskOneAvatar} />
                            <p>{taskOne}</p>
                            {taskOneBool && (
                                <img className='doneImg' src={Done} alt='done' />)}
                            {!taskOneBool && (
                                <img className='notDoneImg' src={Not} alt='not done' />)}
                        </div>
                    </div>
                    <div className='column'>
                        <h4>Łazienki doł, wiatrołap, pranie</h4>
                        <div onClick={handleFieldTwo} className='tableField'>
                            <Avatar src={taskTwoAvatar} />
                            <p>{taskTwo}</p>
                            {taskTwoBool && (
                                <img className='doneImg' src={Done} alt='done' />)}
                            {!taskTwoBool && (
                                <img className='notDoneImg' src={Not} alt='not done' />)}
                        </div>
                    </div>
                    <div className='column'>
                        <h4>Łazienka góra, schody</h4>
                        <div onClick={handleFieldThree} className='tableField'>
                            <Avatar src={taskThreeAvatar} />
                            <p>{taskThree}</p>
                            {taskThreeBool && (
                                <img className='doneImg' src={Done} alt='done' />)}
                            {!taskThreeBool && (
                                <img className='notDoneImg' src={Not} alt='not done' />)}
                        </div>
                    </div>
                </div>
                {!showGraph && (
                    <div className='expandBtn' onClick={() => { showGraph ? setShowGraph(false) : setShowGraph(true) }}>
                        <img src={Expend} alt='expend' />
                        <p>Rozwiń</p>
                    </div>
                )}
                {showGraph && (
                    <div>
                        <div className='cleaningHeaderNext'>
                            <p className='cleaningData'>{dateFromDayOne + "/" + dateFromMonthOne} - {dateToDayOne + "/" + dateToMonthOne}</p>
                        </div>
                        <div className='cleaningTable'>
                            <div className='column'>
                                <h4>Kuchnia, salon, śmieci</h4>
                                <div className='tableField'>
                                    <Avatar src={taskSixAvatar} />
                                    <p>{taskSix}</p>
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Łazienki doł, wiatrołap, pranie</h4>
                                <div className='tableField'>
                                    <Avatar src={taskFourAvatar} />
                                    <p>{taskFour}</p>
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Łazienka góra, schody</h4>
                                <div className='tableField'>
                                    <Avatar src={taskFiveAvatar} />
                                    <p>{taskFive}</p>
                                </div>
                            </div>
                        </div>
                        <div className='cleaningHeaderNext'>
                            <p className='cleaningData'>{dateFromDayTwo + "/" + dateFromMonthTwo} - {dateToDayTwo + "/" + dateToMonthTwo}</p>
                        </div>
                        <div className='cleaningTable'>
                            <div className='column'>
                                <h4>Kuchnia, salon, śmieci</h4>
                                <div className='tableField'>
                                    <Avatar src={taskThreeAvatar} />
                                    <p>{taskThree}</p>
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Łazienki doł, wiatrołap, pranie</h4>
                                <div className='tableField'>
                                    <Avatar src={taskOneAvatar} />
                                    <p>{taskOne}</p>
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Łazienka góra, schody</h4>
                                <div className='tableField'>
                                    <Avatar src={taskTwoAvatar} />
                                    <p>{taskTwo}</p>
                                </div>
                            </div>
                        </div>
                        <div className='cleaningHeaderNext'>
                            <p className='cleaningData'>{dateFromDayThree + "/" + dateFromMonthThree} - {dateToDayThree + "/" + dateToMonthThree}</p>
                        </div>
                        <div className='cleaningTable'>
                            <div className='column'>
                                <h4>Kuchnia, salon, śmieci</h4>
                                <div className='tableField'>
                                    <Avatar src={taskFiveAvatar} />
                                    <p>{taskFive}</p>
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Łazienki doł, wiatrołap, pranie</h4>
                                <div className='tableField'>
                                    <Avatar src={taskSixAvatar} />
                                    <p>{taskSix}</p>
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Łazienka góra, schody</h4>
                                <div className='tableField'>
                                    <Avatar src={taskFourAvatar} />
                                    <p>{taskFour}</p>
                                </div>
                            </div>
                        </div>
                        <div className='cleaningHeaderNext'>
                            <p className='cleaningData'>{dateFromDayFour + "/" + dateFromMonthFour} - {dateToDayFour + "/" + dateToMonthFour}</p>
                        </div>
                        <div className='cleaningTable'>
                            <div className='column'>
                                <h4>Kuchnia, salon, śmieci</h4>
                                <div className='tableField'>
                                    <Avatar src={taskTwoAvatar} />
                                    <p>{taskTwo}</p>
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Łazienki doł, wiatrołap, pranie</h4>
                                <div className='tableField'>
                                    <Avatar src={taskThreeAvatar} />
                                    <p>{taskThree}</p>
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Łazienka góra, schody</h4>
                                <div className='tableField'>
                                    <Avatar src={taskOneAvatar} />
                                    <p>{taskOne}</p>
                                </div>
                            </div>
                        </div>
                        <div className='cleaningHeaderNext'>
                            <p className='cleaningData'>{dateFromDayFive + "/" + dateFromMonthFive} - {dateToDayFive + "/" + dateToMonthFive}</p>
                        </div>
                        <div className='cleaningTable'>
                            <div className='column'>
                                <h4>Kuchnia, salon, śmieci</h4>
                                <div className='tableField'>
                                    <Avatar src={taskFourAvatar} />
                                    <p>{taskFour}</p>
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Łazienki doł, wiatrołap, pranie</h4>
                                <div className='tableField'>
                                    <Avatar src={taskFiveAvatar} />
                                    <p>{taskFive}</p>
                                </div>
                            </div>
                            <div className='column'>
                                <h4>Łazienka góra, schody</h4>
                                <div className='tableField'>
                                    <Avatar src={taskSixAvatar} />
                                    <p>{taskSix}</p>
                                </div>
                            </div>
                        </div>
                        <div className='expandBtn' onClick={() => { showGraph ? setShowGraph(false) : setShowGraph(true) }}>
                            <img src={Collapse} alt='collapse' />
                            <p>Zwiń</p>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}
