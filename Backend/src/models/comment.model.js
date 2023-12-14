import {Schema, model} from "mongoose"

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
    },
    
    description: {
        type: String,
        required: true,
    }
})
export default model("Comment", commentSchema)