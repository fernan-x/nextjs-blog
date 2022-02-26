import { GetStaticProps, NextPage } from 'next'
import Header from '../../components/Header'
import PostComment from '../../components/post/PostComment'
import PostContent from '../../components/post/PostContent'
import { sanityClient } from '../../lib/sanity'
import { Post } from '../../types/common/typings'
import { queryPostFromSlug, queryPostsSlug } from '../../utils/queries'

interface Props {
  post: Post
}

export const getStaticPaths = async () => {
  const posts = await sanityClient.fetch(queryPostsSlug)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await sanityClient.fetch(queryPostFromSlug, {
    slug: params!.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // Refresh the old cache every 60 seconds
  }
}

const Post: NextPage<Props> = ({ post }: Props) => {
  return (
    <main>
      <Header />
      <PostContent post={post} />
      <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />
      {/* TODO : Load comments */}
      <PostComment post={post} />
    </main>
  )
}

export default Post
