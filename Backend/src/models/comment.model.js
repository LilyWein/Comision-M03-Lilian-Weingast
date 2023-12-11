import { Schema, model } from "mongoose";

const commentSchema = new Schema(
   {
        description: {
          type: String,
          required: true,
        },

        autor:{
          type: Schema.Types.ObjectId,
           ref: "User",
           required: true,
        },
    },

   {
     timestamps: true,
     versionKey: false,
    }
); 

export default model("Comment", commentSchema);