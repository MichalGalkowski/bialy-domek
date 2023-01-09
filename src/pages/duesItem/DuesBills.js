import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../../components/Avatar"

export default function DuesBills({ dues }) {

  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore('dues')
  const [billName, setBillName] = useState('')
  const [billValue, setBillValue] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const deposit = {
      userId: user.uid,
      userName: user.displayName,
      photoURL: user.photoURL,
      name: billName,
      amount: billValue,
      id: Math.random()
    }

    await updateDocument(dues.id, {
      deposits: [...dues.deposits, deposit],
    })
    if (!response.error) {
      setBillName('')
      setBillValue('')
    }
  }

  return (
    <div className="duesBills">
      <h4>Dodaj rachunek</h4>
      <form className="addBill" onSubmit={handleSubmit}>
        <label>
          <span>Nazwa:</span>
          <input
            required
            type="text"
            maxLength={1000}
            onChange={(e) => setBillName(e.target.value)}
            value={billName}
          />
        </label>
        <label>
        <span>Kwota:</span>
          <input
            required
            className='inputValue'
            type="number"
            maxLength={1000}
            onChange={(e) => setBillValue(e.target.value)}
            value={billValue}
          />
        </label>
        <button className="btn">Dodaj rachunek</button>
      </form>
      <h4>Wpłaty</h4>

      <ul>
        {dues.deposits.length > 0 && dues.deposits.map(bill => (
          <li key={bill.id}>
            <div className="billAuthor">
              <Avatar className="avatar" src={bill.photoURL} />
              <p>{bill.userName}</p>
            </div>
            <div className="billData">
              <p>{bill.name}</p>
              <p>{bill.amount}</p>
            </div>
          </li>
        ))}
      </ul>
      <h4>Wypłaty</h4>

      <ul>
        {dues.withdrawals.length > 0 && dues.withdrawals.map(bill => (
          <li key={bill.id}>
            <div className="billAuthor">
              <Avatar src={bill.photoURL} />
              <p>{bill.userName}</p>
            </div>
            <div className="billData">
              <p>{bill.name}</p>
              <p>{bill.amount}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
