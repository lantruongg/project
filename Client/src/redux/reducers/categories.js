import { INIT_STATE } from "../../constant";
import { getCategories, getType, updateCategories, deleteCategories, createCategories } from "../actions";

export default function DepartmentsReducers(state = INIT_STATE.categories, action) {
    switch (action.type) {
        case getType(getCategories.getCategoriesRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getCategories.getCategoriesSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getCategories.getCategoriesFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(createCategories.createCategoriesSuccess):
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case getType(updateCategories.updateCategoriesSuccess):
            return {
                ...state,
                data: state.data.map((category) =>
                    category._id === action.payload._id ? action.payload : category
                ),
            };
        case getType(deleteCategories.deleteCategoriesSuccess):
            const newData =state.data.filter((category)=>{ return category._id !== action.payload._id});
            console.log(newData)
            return {
                ...state,
                data: newData,
            };
        default:
            return state;
    }
}