import { DepartmentModel } from '../model/departments.js'
export const getDepartment = async (req, res) => {
  try {
    const department = await DepartmentModel.find()
    res.status(200).json(department)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const createDepartment = async (req, res) => {
  try {
    const newDepartment = req.body
    const department = new DepartmentModel(newDepartment)
    await department.save()
    res.status(200).json(department)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const deleteDepartment = async (req, res) => {
  try {
    const deleteDepartment = req.params.id
    const department = await DepartmentModel.findByIdAndDelete(
      deleteDepartment,
      { new: true }
    )
    res.status(200).json(department)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const updateDepartment = async (req, res) => {
  try {
    const updateDepartments = req.body
    const Department = await DepartmentModel.findByIdAndUpdate(
      { _id: updateDepartments._id },
      updateDepartments,
      { new: true }
    )
    res.status(200).json(Department)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
