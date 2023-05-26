import styled from 'styled-components'
import Title from '../typography/title.tsx'
import Profile from './profile.tsx'
import Tags from './tags.tsx'
import ShortDescription from '../typography/shortDescription.tsx'
import { format } from 'date-fns'
import MainText from '../typography/mainText.tsx'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../store/hooks.ts'
import { deleteArticle } from '../api/articleAPI.ts'
import { selectToken } from '../store/slices/userSlice.ts'
import { Popconfirm, Space } from 'antd'
import { Button } from './button.tsx'

const StyledPost = styled.div`
  background-color: ${({ theme }) => theme.baseBg};
  width: 65%;
  height: max-content;
  border-radius: 5px;
  margin: 26px 26px 0 26px;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));
  padding: 15px 15px 20px 20px;

  .post__header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .post__main {
    margin-top: 25px;
  }

  .post__description {
    display: flex;
    justify-content: space-between;
  }
`
type PostProps = {
  slug: string
  title: string
  tagList: string[]
  author: {
    username: string
    image?: string
  }
  favorited: boolean
  createdAt: string
  favoritesCount: number
  description: string
  text?: string
  myPost?: boolean
}

function Post(props: PostProps) {
  const {
    slug,
    title,
    tagList,
    author,
    createdAt,
    favoritesCount,
    description,
    favorited,
    text,
    myPost,
  } = props

  const { id } = useParams()
  const date = new Date(createdAt)

  const token = useAppSelector(selectToken)
  const [redirected, setRedirected] = useState<boolean>(false)

  const deleteHandler = async () => {
    if (token && id) {
      const response = await deleteArticle(id, token)

      if (response.status === 204) {
        setRedirected(true)
      }
    }
  }
  return (
    <>
      {redirected && <Navigate to={'/'} />}
      <StyledPost>
        <div className='post__header'>
          <div style={{ background: '#FFFFFF' }}>
            <Title text={title} slug={slug} likes={favoritesCount} favorited={favorited} />
            <Tags tags={tagList} />
          </div>
          <Profile username={author.username} image={author.image} createdAt={format(date, 'PP')} />
        </div>
        <div className='post__description'>
          <ShortDescription description={description} />
          {myPost && (
            <div className={'post-btns'}>
              <Space size='small'>
                <Popconfirm
                  placement='rightTop'
                  title={'Are you sure to delete this article?'}
                  onConfirm={deleteHandler}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button small error>
                    Delete
                  </Button>
                </Popconfirm>
                <Link to='edit'>
                  <Button success small>
                    Edit
                  </Button>
                </Link>
              </Space>
            </div>
          )}
        </div>
        {text && (
          <div className='post__main'>
            <MainText text={text ?? ''} />
          </div>
        )}
      </StyledPost>
    </>
  )
}

export default Post
