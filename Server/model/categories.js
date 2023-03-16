import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Khong co'
    },
    description:{
      type:String,
      require:false,
      default:"Không có miêu tả"
    },
    begin: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);
export const CategoriesModel = mongoose.model("Category", schema);