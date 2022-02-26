/**
 * Query to get all posts for a listing
 */
export const queryPosts = `*[_type == "post"]{
    _id,
    title,
    slug,
    description,
    mainImage,
    author -> {
      name,
      image
    }
}`

/**
 * Query to get all posts slug. Used for static page generation per post
 */
export const queryPostsSlug = `*[_type == "post"] {
    _id,
    slug {
        current
    }
}`

/**
 * Query to get the detail of a post based on it's slug
 */
export const queryPostFromSlug = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author -> {
      name, 
      image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
}`
