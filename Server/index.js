import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import posts from './routers/posts.js'
import users from './routers/users.js'
import departments from './routers/departments.js'
import categories from './routers/categories.js'
import comments from './routers/comments.js'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { DepartmentModel } from './model/departments.js'
import { getDepartment } from './controller/departments.js'
import { v2 as cloudinary } from 'cloudinary'

const app = express()
const PORT = process.env.port || 5000
const URI =
  'mongodb+srv://admin:NwDpWtA8h7d0GpMH@cluster1.yp9solp.mongodb.net/?retryWrites=true&w=majority'
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb' }))
app.use(morgan('combined'))
app.use(cors())
app.use('/posts', posts)
app.use('/users', users)
app.use('/departments', departments)
app.use('/categories', categories)
app.use('/comments', comments)
app.get('/', (req, res) => {
  res.send('SUCCESS')
  console.log('SUCCESS')
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB')
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT)
    })
  })
  .catch((err) => {
    console.log('ERR', err)
  })
