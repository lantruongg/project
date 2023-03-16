import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default:
        'https://cdn.landesa.org/wp-content/uploads/default-user-image.png',
    },
    role: {
      type: String,
      required: true,
      default: 'Staff',
    },
    department: {
      type: String,
      required: true,
      default: 'None',
    },

    posts: { type: Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true }
)
export const UserModel = mongoose.model('User', schema)
