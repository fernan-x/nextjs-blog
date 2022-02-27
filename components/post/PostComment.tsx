import React from 'react'
import { Post } from '../../types/common/typings'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
}

const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  console.log(data)
}

const PostComment = ({ post }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
      >
        <h3 className="text-sm text-yellow-500">Enjoyed this article</h3>
        <h4 className="text-3xl font-bold">Leave a comment below !</h4>
        <hr className="mt-2 py-3" />

        <input {...register('_id')} type="hidden" name="_id" value={post._id} />

        <label className="mb-5 block">
          <span className="text-gray-700">Name</span>
          <input
            {...register('name', { required: true })}
            className="from-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
            placeholder="John Appleseed"
            type="text"
          />
          {errors.name && (
            <p className="p-2">
              <span className="text-red-500">The Name field is required</span>
            </p>
          )}
        </label>
        <label className="mb-5 block">
          <span className="text-gray-700">Email</span>
          <input
            {...register('email', { required: true })}
            className="from-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
            placeholder="john.appleseed@gmail.com"
            type="email"
          />
          {errors.comment && (
            <p className="p-2">
              <span className="text-red-500">
                The Comment field is required
              </span>
            </p>
          )}
        </label>
        <label className="mb-5 block">
          <span className="text-gray-700">Comment</span>
          <textarea
            {...register('comment', { required: true })}
            className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
            placeholder="John Appleseed"
            rows={8}
          />
          {errors.email && (
            <p className="p-2">
              <span className="text-red-500">The Email field is required</span>
            </p>
          )}
        </label>

        <input
          type="submit"
          className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white hover:bg-yellow-400 focus:outline-none"
        />
      </form>
    </>
  )
}

export default PostComment
