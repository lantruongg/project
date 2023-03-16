import { UserModel } from '../model/users.js'
import { generateToken } from '../utils.js'
import bcrypt from 'bcryptjs'
import { registerUserSchema } from '../helpers/validation_schema.js'
import { v2 as cloudinary } from 'cloudinary'

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
    res.send(users)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID)
    console.log(user)
    if (user) {
      res.send({
        _id: user._id,
        fullName: user.fullName,
        department: user.department,
        avatar: user.avatar,
        role: user.role,
      })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const loginUsers = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email })
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        token: generateToken(user),
      })
      return
    }
  }
  res.status(401).send({ message: 'Invalid email or password' })
}

export const loginGoogleUsers = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email })
  if (user) {
    res.send({
      _id: user._id,
      token: generateToken(user),
    })
    return
  }
  res
    .status(401)
    .send({ message: 'Cannot find your email! Please sign up a new one' })
}

export const registerUsers = async (req, res, next) => {
  try {
    await registerUserSchema.validateAsync(req.body)
    const newUser = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      role: req.body.roleUser,
      password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save()
    res.send({
      _id: user._id,
      token: generateToken(user),
    })
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422).send({ message: `${err.details[0].message}` })
    }
    next(err)
  }
}
export const registerGoogleUsers = async (req, res) => {
  try {
    const newUser = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatar: req.body.avatar,
      password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save()
    res.send({
      _id: user._id,
      token: generateToken(user),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID)
    if (user) {
      if (user.role === 'Admin') {
        res.send({ message: 'Can not delete admin' })
        return
      }
      await user.remove()
      res.send({ message: 'User Deleted' })
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.body.userID,
      {
        $set: { role: req.body.role },
      },
      { new: true }
    )
    if (updatedUser) {
      res.send({ message: 'User updated' })
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID)
    if (user) {
      const fileStr = req.body.data || req.data
      if (fileStr) {
        const uploadedResponse = await cloudinary.uploader.upload(fileStr)
        user.avatar = uploadedResponse.url
      }
      user.fullName = req.body.fullName || user.fullName
      await user.save()
      res.status(200).send({ message: 'User updated' })
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
