import { useAppDispatch, useAppSelector } from '../store/hooks.ts'
import { fetchAllPosts, setCurrentPage } from '../store/slices/postsSlice.ts'
import { useEffect } from 'react'
import { Pagination, Spin } from 'antd'
import Post from '../components/post.tsx'
import BlogBody from '../components/blogBody.tsx'

function BlogPage() {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state) => state.posts.currentPage)
  const totalPosts = useAppSelector((state) => state.posts.totalPosts)
  const fetchPosts = () => {
    dispatch(fetchAllPosts())
  }

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const posts = useAppSelector((state) => state.posts.posts)

  useEffect(fetchPosts, [currentPage])
  return (
    <BlogBody>
      {!posts.length && <Spin tip='Loading posts...' size='large' />}
      {posts.map((post) => (
        <Post
          key={post.slug}
          slug={post.slug}
          tagList={post.tagList}
          author={post.author}
          title={post.title}
          description={post.description}
          createdAt={post.createdAt}
          favoritesCount={post.favoritesCount}
          favorited={post.favorited}
        />
      ))}
      <Pagination
        style={{ margin: '25px 0' }}
        defaultCurrent={1}
        current={currentPage}
        defaultPageSize={5}
        total={totalPosts}
        showSizeChanger={false}
        onChange={(page) => onPageChange(page)}
        showQuickJumper={false}
        hideOnSinglePage
      />
    </BlogBody>
  )
}

export default BlogPage
