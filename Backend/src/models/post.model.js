import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    autor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    
    comments: {
      type: String,
      ref: "Comment",
      required: false,
    },

    imageURL: {
      type: String,
      required: true,
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
           
  },
  
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Post", postSchema);
