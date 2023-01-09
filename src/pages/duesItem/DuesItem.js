import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'

// components
import DuesBills from "./DuesBills"
import DuesData from "./DuesData"

// styles
import './DuesItem.css'

export default function DuesItem() {
  const { id } = useParams()
  const { document, error } = useDocument('dues', id)

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Czekaj...</div>
  }

  return (
    <div className="content duesDetails">
      <DuesData dues={document} />
      <DuesBills dues={document} />
    </div>
  )
}