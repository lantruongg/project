import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default:'Khong co'
    },
  },
  { timestamps: true }
);
export const DepartmentModel = mongoose.model("Department", schema);
