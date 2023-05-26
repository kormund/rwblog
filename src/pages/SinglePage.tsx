import { useParams } from 'react-router-dom'
import BlogBody from '../components/blogBody.tsx'
import Post from '../components/post.tsx'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { useAppSelector } from '../store/hooks.ts'
import { RootState } from '../store/store.ts'
import { PostType } from '../types/post.ts'

function SinglePage() {
  const { id } = useParams()
  const [post, setPost] = useState()
  const userData = useAppSelector((state: RootState) => state.user)
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${id}`, {
      headers: {
        Authorization: `Token ${userData.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPost(data.article))
  }, [id])

  if (!post) {
    return <Spin size='large' />
  }

  const { slug, favorited, title, tagList, author, createdAt, favoritesCount, description, body } =
    post as PostType

  const isMyPost = userData.username === author.username

  return (
    <BlogBody>
      <Post
        slug={slug}
        title={title}
        tagList={tagList}
        author={author}
        favorited={favorited}
        createdAt={createdAt}
        favoritesCount={favoritesCount}
        description={description}
        text={body}
        myPost={isMyPost}
      />
    </BlogBody>
  )
}

export default SinglePage
