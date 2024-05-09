import { User } from "../models/user.js"
import  bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendCookies } from "../utils/features.js"
import ErrorHandeler from "../MiddleWares/error.js"




export const login = async(req, res,next) => {
            try {
                const  {email, password} = req.body;


                const user = await  User.findOne({email}).select("+password");
            
                if(!user)  return next(new ErrorHandeler("Invalide email or Password ",400));
            
                const isMatch= await bcrypt.compare(password, user.password);
            
                if(!isMatch)  return next(new ErrorHandeler("Invalide email or Password ",400));
            
                
            
                 sendCookies(user,res,`Welcome Back, ${user.name}`)
            
            } catch (error) {
                    next(error);                
            }
}


export const register = async (req,res) =>{
    try {
        const  {name,email,password} = req.body;
    
        let user = await User.findOne({email})
        
        if(user)  return next(new ErrorHandeler("user already Exists",400));
       
    
        const hashedPassword = await bcrypt.hash(password,10) 
    
       user =  await User.create({name,email, password:hashedPassword})
    
    
       sendCookies(user, res, "Register successfully",201);
        
    } catch (error) {
        next(error);    
    }
};


export const getMyProfile =   (req,res) =>{
   

   
    res.status(200).json({
        success: true,
        user:req.user,

    })

}

   export const logout = (req,res) =>{
    res.status(200)
    .cookie("token","",{expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Development"?"lax": "none",
        secure:process.env.NODE_ENV === "Develpoment"?false : true,

    })
    .json({
        success: true,
        user:req.user,

    });

   };






// export const specialFunctions = (req,res) => {
//     res.json({
//         success: true,
//         message:"just joking",

//     })  
// }




// export const UpdateUser =  async (req,res) =>{
  
//     console.log(req.query);

//   const users =  await  User.find({});

//         res.json({
//             success: true,
//             message: "Updated ",
//         });
// }

// export const DeleteUser =  async (req,res) =>{
  
//     console.log(req.query);

//   const users =  await  User.find({});

//    await user.remove();

//         res.json({
//             success: true,
//             message: "Deleted",
//         });
// }