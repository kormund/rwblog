import { Avatar } from 'antd'
import styled from 'styled-components'

const StyledProfile = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  text-align: right;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.baseBg};

  .username {
    color: ${({ theme }) => theme.heading};
    background: ${({ theme }) => theme.baseBg};
  }

  .date {
    font-size: 12px;
    line-height: 22px;
    color: ${({ theme }) => theme.textSecondary};
    background: ${({ theme }) => theme.baseBg};
  }
`
type Props = {
  username: string
  image: string | undefined
  createdAt?: string
}
function Profile(props: Props) {
  const { username, image, createdAt } = props
  return (
    <StyledProfile>
      <div>
        <h6 className='username'>{username}</h6>
        {createdAt && <div className='date'>{createdAt}</div>}
      </div>
      <Avatar src={image} alt='profile pic' size={50} />
    </StyledProfile>
  )
}

export default Profile
