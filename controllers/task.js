import ErrorHandeler from "../MiddleWares/error.js";
import {Task} from "../models/task.js"

export  const newTask = async (req,res, next)=>{
        try {
            const {title,description} = req.body; 


            await Task.create({
               title,
               description,
               user: req.user,
            })
   
           res.status(200).json({
               success: true,
               message:"Task created successfully",
           })
   
        } catch (error) {
            next(error);
        }

}

export const getMytask = async (req, res, next)=>{
      try {
        const userid = req.user._id;

        const tasks= await Task.find({user: userid});

        res.status(200).json({
            success: true,
            tasks,
        })

      } catch (error) {
            next(error);        
      }
}


export const upDateMytask = async (req, res, next)=>{
      try {
        const task = await Task.findById(req.params.id);
        
        if(!task)
          return next(new ErrorHandeler("Task not found",404));

        task.isCompleted = !task.isCompleted;


      await task.save();


    res.status(200).json({
        success: true,
        message:"Task updated!"
    })
      } catch (error) {
            next(error)  
      }
}

export const DeleteMytask = async (req, res, next)=>{
  
  try {
    const task = await Task.findById(req.params.id);

    if(!task)
        return next(new ErrorHandeler("Task not found",404));

           await task.deleteOne();

    res.status(200).json({
        success: true,
        message:"Task deleted"
        
    })
  } catch (error) {
     next(error)
  }

}


