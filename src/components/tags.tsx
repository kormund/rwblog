import { Tag } from 'antd'
import { nanoid } from '@reduxjs/toolkit'

type Props = {
  tags: string[] | undefined
}

function Tags(props: Props) {
  const { tags } = props
  return (
    <div>
      {tags &&
        tags.map((tag) => {
          return tag ? <Tag key={nanoid()}>{tag}</Tag> : null
        })}
    </div>
  )
}

export default Tags
