import React from 'react'
import { Post } from '../../types/common/typings'

interface Props {
  post: Post
}

const PostComment = ({ post }: Props) => {
  return <>{JSON.stringify(post)}</>
}

export default PostComment
