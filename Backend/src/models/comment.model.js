import {Schema, model} from "mongoose"

const commentSchema = new Schema ({
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