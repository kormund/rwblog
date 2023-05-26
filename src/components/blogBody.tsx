import styled from 'styled-components'
import React from 'react'

const StyledBlogBody = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 80px);
  margin: 0;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
`

type BlogBodyProps = {
  children: React.ReactNode
}

function BlogBody({ children }: BlogBodyProps) {
  return <StyledBlogBody>{children}</StyledBlogBody>
}

export default BlogBody
