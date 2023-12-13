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

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    
    comments: {
      type: String,
      ref: "Comment",
      
    },

    imageURL: {
      type: String,
      required: true,
    },
    
    date: {
      type: Date,
      default: Date.now,
    },

    updatedAt:{
      type: Date,
      default: null,
    },

              
  },
  
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Post", postSchema);
