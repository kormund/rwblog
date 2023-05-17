import { useParams } from 'react-router-dom'

function SinglePage() {
  const { id } = useParams()
  return <div>Single post {id}</div>
}

export default SinglePage
