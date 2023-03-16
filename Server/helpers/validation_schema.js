import joi from 'joi'

export const registerUserSchema = joi.object({
  email: joi.string().email().lowercase().required(),
  fullName: joi.string().min(3).required(),
  password: joi.string().min(3).required(),
  roleUser: joi.string().required(),
})

export const postValidateSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  author: joi.string().required(),
  department: joi.string().required(),
  categories: joi.allow(),
  attachment: joi.allow(),
  // categories: joi.string(),
  // likeCount: joi.string(),
})
