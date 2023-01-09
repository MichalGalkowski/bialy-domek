import { useCollection } from '../../hooks/useCollection'

// components
import DuesList from '../../components/DuesList'

// styles
import './Dues.css'

export default function Dues() {

    const { documents, error } = useCollection('dues', ['createdAt', 'desc'])

    return (
        <div className='content'>
            <h2 className="pageTitle">Składki</h2>
            {error && <p className="error">{error}</p>}
            {documents && <DuesList dues={documents} />}
        </div>
    )
}
