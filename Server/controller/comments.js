import { CommentModel } from '../model/comments.js'
export const getComment = async (req, res) => {
  try {
    const newcomment =req.body
    const comment = await CommentModel.findById({_id:newcomment._id})
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const createComment = async (req, res) => {
  try {
    const newComment = req.body
    const comment = new CommentModel(newComment)
    await comment.save()
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const deleteComment = async (req, res) => {
  try {
    const deleteComment = req.params.id
    const comment = await CommentModel.findByIdAndDelete(
      deleteComment,
      { new: true }
    )
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const updateComment = async (req, res) => {
  try {
    const updateComment = req.body
    const comment = await CommentModel.findByIdAndUpdate(
      { _id: updateComment._id },
      updateComment,
      { new: true }
    )
    res.status(200).json(Comment)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}