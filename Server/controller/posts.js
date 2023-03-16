import { PostModel } from '../model/posts.js'
import { transporter, levenshteinDistance } from '../utils.js'
import joi from 'joi'
import { v2 as cloudinary } from 'cloudinary'
import { DepartmentModel } from '../model/departments.js'
import { UserModel } from '../model/users.js'
import { Parser } from 'json2csv'
import { MongoClient } from 'mongodb'
import fs from 'fs'
import archiver from 'archiver'
import { createReadStream, createWriteStream } from 'fs'
import { createGzip } from 'zlib'
import { promisify } from 'util'
import { pipeline } from 'stream'
import { ObjectId } from 'mongodb'
export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author').exec()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const createPosts = async (req, res, next) => {
  try {
    const result = await DepartmentModel.distinct('name')
    const postValidateSchema = joi.object({
      title: joi.string().required(),
      content: joi.string().required(),
      author: joi.string().required(),
      department: joi
        .string()
        .valid(...result)
        .required(),
      categories: joi.allow(),
      attachment: joi.allow(),
      isAnonymous: joi.boolean().required(),
      likeCount: joi.number().valid(0).allow(),
      view: joi.number().valid(0).allow(),
    })
    await postValidateSchema.validateAsync(req.body)
    const newPost = req.body
    const post = new PostModel(newPost)
    const fileStr = post.attachment
    if (fileStr) {
      const uploadedResponse = await cloudinary.uploader.upload(fileStr)
      post.attachment = uploadedResponse.url
    }
    await post.save()
    // send email
    let mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'lyhungphat25@gmail.com',
      subject: 'New idea posted',
      text: 'Hello there, one idea of user has been sent',
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred: ' + error.message)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
    res.status(200).json(post)
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422).send({ message: `${err.details[0].message}` })
    }
    next(err)
  }
}
export const updatePosts = async (req, res) => {
  try {
    const updatePosts = req.body
    const post = await PostModel.findByIdAndUpdate(
      { _id: updatePosts._id },
      updatePosts,
      { new: true }
    )
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const deletePosts = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id)
    if (post) {
      if (post.author === req.body.author) {
        await post.remove()
        res.status(200).send({ message: 'Post Deleted' })
      }
    } else {
      res.status(404).send({ message: 'Cannot delete other post' })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const deletePostByAdmin = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id)
    if (post) {
      await post.remove()
      res.status(200).send({ message: 'Post Deleted' })
    } else {
      res.status(404).send({ message: 'Cannot delete other post' })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const viewPostsByMostViews = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ view: -1 })
      .populate('author', 'fullName avatar _id role department')
      .lean()
    const filteredPosts = posts.filter((post) => post.status === 'Accepted')
    res.status(200).json(filteredPosts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const viewPostsByMostLikes = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ likeCount: -1 })
      .populate('author', 'fullName avatar _id role department')
      .lean()
    const filteredPosts = posts.filter((post) => post.status === 'Accepted')
    res.status(200).json(filteredPosts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const viewRecentlyPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate('author', 'fullName avatar _id role department')
      .lean()
    const filteredPosts = posts.filter((post) => post.status === 'Accepted')

    res.status(200).json(filteredPosts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const searchPostsByKeyword = async (req, res) => {
  try {
    // Post can search by title, content and author
    const keyword = req.params.keyword
    const regex = new RegExp(keyword, 'i')

    const authors = await UserModel.find({ fullName: { $regex: regex } })
    const authorNames = authors.map((author) => author.fullName)
    const authorIds = authors.map((author) => author._id)
    const allPosts = await PostModel.find({})
      .populate('author', 'fullName avatar _id role department')
      .lean()
    const posts = await PostModel.find({
      $or: [
        {
          title: { $regex: regex },
        },
        {
          content: { $regex: regex },
        },
        {
          author: { $in: authorIds },
        },
      ],
    })
      .populate('author', 'fullName avatar _id role department')
      .lean()
    const filteredAuthorPosts = allPosts.filter((post) => {
      const authorFullName = post.author.fullName
      const distance = levenshteinDistance(keyword, authorFullName)
      if (distance <= 5) {
        return true
      }
      // }
      // return false
    })
    const filteredTitlePosts = allPosts.filter((post) => {
      const title = post.title
      const distance = levenshteinDistance(keyword, title)
      if (distance <= 10) {
        return true
      }
    })
    const filteredContentPosts = allPosts.filter((post) => {
      const content = post.content
      const distance = levenshteinDistance(keyword, content)
      if (distance <= 10) {
        return true
      }
    })
    res.send([
      ...filteredAuthorPosts,
      ...filteredTitlePosts,
      ...filteredContentPosts,
      ...posts,
    ])
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const viewPostsByDepartment = async (req, res) => {
  try {
    const department = req.params.department
    const posts = await PostModel.find({ department })
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const updatePostToAccepted = async (req, res) => {
  try {
    const updatePosts = req.body
    const post = await PostModel.findByIdAndUpdate(
      { _id: updatePosts._id },
      { status: 'Accepted' },
      { new: true }
    )
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const updatePostToRejected = async (req, res) => {
  try {
    const updatePosts = req.body
    const post = await PostModel.findByIdAndUpdate(
      { _id: updatePosts._id },
      { status: 'Rejected' },
      { new: true }
    )
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const exportPost = async (req, res) => {
  const uri =
    'mongodb+srv://lyhungphat:Fap123456@crud.bjynqbk.mongodb.net/users?retryWrites=true&w=majority'
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const db = client.db('test')

  try {
    const data = await db.collection('users').find({}).toArray()
    const fields = ['_id', 'name', 'email']
    const json2csvParser = new Parser({ fields })
    const csv = json2csvParser.parse(data)

    const outputFile = 'output.csv'
    fs.writeFileSync(outputFile, csv)
    console.log(`Data exported to ${outputFile}`)

    res.download(outputFile)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error exporting data to CSV')
  } finally {
    client.close()
  }
}
export const downloadPost = async (req, res) => {
  const uri =
    'mongodb+srv://lyhungphat:Fap123456@crud.bjynqbk.mongodb.net/users?retryWrites=true&w=majority'
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const db = client.db('test')
  try {
    const data = await db
      .collection('users')
      .findOne({ _id: new ObjectId(req.body._id) })
    const fields = ['_id', 'name', 'email']
    const json2csvParser = new Parser({ fields })
    const csv = json2csvParser.parse(data)

    const zipName = 'user.zip'
    const output = createWriteStream(zipName)
    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(output)
    archive.append(csv, { name: 'users.csv' })
    archive.finalize()
    res.send(zipName)
    return zipName
  } catch (err) {
    console.error(err)
  } finally {
    client.close()
  }
}
