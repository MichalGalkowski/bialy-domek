import { useCollection } from '../../hooks/useCollection'

// components
import InfoList from '../../components/InfoList'

// styles
import './Home.css'

export default function Home() {

  const { documents, error } = useCollection('infos', ['createdAt', 'desc'])

  return (
    <div className="content">
        <div>
            <h2 className="pageTitle">Informacje</h2>
            {error && <p className="error">{error}</p>}
            {documents && <InfoList infos={documents} />}
        </div>
    </div>
  )
}
