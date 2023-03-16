import { INIT_STATE } from "../../constant";
import { getDepartments, getType, updateDepartments, deleteDepartments, createDepartments } from "../actions";

export default function DepartmentsReducers(state = INIT_STATE.departments, action) {
    switch (action.type) {
        case getType(getDepartments.getDepartmentsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getDepartments.getDepartmentsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getDepartments.getDepartmentsFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(createDepartments.createDepartmentsSuccess):
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case getType(updateDepartments.updateDepartmentsSuccess):
            return {
                ...state,
                data: state.data.map((department) =>
                    department._id === action.payload._id ? action.payload : department
                ),
            };
        case getType(deleteDepartments.deleteDepartmentsSuccess):
            const newData =state.data.filter((department)=>{ return department._id !== action.payload._id});
            console.log(newData)
            return {
                ...state,
                data: newData,
            };
            
        default:
            return state;
    }
}