import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    department: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: false,
      default: 'none',
    },
    attachment: String,
    likeCount: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    isAnonymous: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)
export const PostModel = mongoose.model('Post', schema)
