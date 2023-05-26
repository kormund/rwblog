import { Button } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useState } from 'react'
import { favoritePost, unfavoritePost } from '../api/favorited.ts'
import { selectIsAuth, selectToken } from '../store/slices/userSlice.ts'
import { useAppSelector } from '../store/hooks.ts'
import { useNavigate } from 'react-router-dom'

interface LikeProps {
  likes: number
  favorited: boolean
  slug: string
}

function Like({ likes, favorited, slug }: LikeProps) {
  const [isLiked, setIsLiked] = useState<boolean>(favorited)
  const [likeNumber, setLikeNumber] = useState(likes)
  const token = useAppSelector(selectToken)
  const isAuth = useAppSelector(selectIsAuth)
  const navigate = useNavigate()
  const toggleLike = () => {
    if (!isAuth) navigate('/sign-in')
    setIsLiked(!isLiked)
    setLikeNumber((prev) => (isLiked ? prev - 1 : prev + 1))
    if (isLiked) {
      unfavoritePost(slug, token)
    } else {
      favoritePost(slug, token)
    }
  }

  return (
    <Button
      style={{ border: 'none', padding: 0, backgroundColor: '#FFFFFF' }}
      size='large'
      shape='circle'
      icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
      onClick={toggleLike}
    >
      <span style={{ marginRight: '5px' }}>{likeNumber}</span>
    </Button>
  )
}

export default Like
