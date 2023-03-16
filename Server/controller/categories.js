import { CategoriesModel } from "../model/categories.js";
export const getCate = async (req, res) => {
    try {
        const category = await CategoriesModel.find();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const createCate = async (req, res) => {
    try {
        const newCategory = req.body;
        const category = new CategoriesModel(newCategory);
        await category.save();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const deleteCate = async (req, res) => {
    try {
        const deleteCategory = req.params.id;
        const category = await CategoriesModel.findByIdAndDelete(
            deleteCategory,
            { new: true }
        );
        res.status(200).json(category)
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const updateCate = async (req, res) => {
    try {
        const updateCategory = req.body
        const Category = await CategoriesModel.findByIdAndUpdate(
            { _id: updateCategory._id },
            updateCategory,
            { new: true }
        )
        res.status(200).json(Category)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}