import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
    /*imageURL:{
      type: String,
      required: true,
    },*/

    description: {
      type: String,
      required: true,
    },
    
    user:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    date: {
      type: Date,
      default: Date.now,
    },

    completed: {
      type: Boolean,
     require: true,
    },

    comments:[
       {
         type: Schema.Types.ObjectId,
         ref: 'Comment',
      },
    ],
  },
    
  
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Task", taskSchema);
