import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        requried:true,
    },
  
   isCompleted:{
        type:Boolean,
        defult: false,    
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        requried:true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }

});

 export const Task = mongoose.model("Task", schema);
