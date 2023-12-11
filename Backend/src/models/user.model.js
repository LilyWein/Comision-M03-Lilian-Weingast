import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
   
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    
    /*avatar: {
      type: String,
      required: true,
      enum: [
        '',
        'url_avatar_2',
        'url_avatar_3',
        // Agrega aquí más URLs de avatares disponibles según sea necesario
      ],
    },*/
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", userSchema);
