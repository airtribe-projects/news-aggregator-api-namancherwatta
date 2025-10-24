import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    preferences: {
    type: [String],
    default: []
},
    readArticles: { 
    type: [String],
    default: [] 
},
    favoriteArticles: { 
    type: [String],
    default: [] 
}

})

export default mongoose.model("User",userSchema)


