import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Like from '../components/like.tsx'

const StyledTitle = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
`

type TitleProps = {
  text: string
  likes: number
  favorited: boolean
  slug: string
}
function Title(props: TitleProps) {
  const { slug, text, likes, favorited } = props

  return (
    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
      <StyledTitle to={`/articles/${slug}`}>
        <h5>{text}</h5>
      </StyledTitle>
      <Like likes={likes} favorited={favorited} slug={slug} />
    </div>
  )
}

export default Title
