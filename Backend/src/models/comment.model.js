import { Schema, model } from "mongoose";

<<<<<<< Updated upstream
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
=======
const commentSchema = new Schema ({
    
    postid:{
        type: Schema.Types.ObjectId,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    autor:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
>>>>>>> Stashed changes
    },

   {
     timestamps: true,
     versionKey: false,
    }
); 

export default model("Comment", commentSchema);