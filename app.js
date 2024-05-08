import  express  from "express";
import userRouter from  "./Routes/user.js";
import taskRouter from "./Routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./MiddleWares/error.js";
import cors from "cors";

 export const app = express();
config({
     path: "./data/config.env",
})
// using middleware;
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT','DELETE'],
    credentials: true,
}));
// using  routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);





app.get('/', (req, res) => {
    res.send("Nice working");
})


app.get('/users/all', async (req,res) =>{
  
    console.log(req.query);

  const users =  await  User.find({});

        res.json({
            success: true,
            users,
        });
});


    app.get("/userid/:id",async(req,res)=>{
        const {id}=req.params;
       const user=  await User.findById(id);
        console.log (req.params);
        res.json({
            success:true,
            user,
        })
    })



app.post('/users/new', async (req,res) =>{


        const {name,email,password} = req.body;
 
        await  User.create({
         name,
         email,
         password,
    })
  
          res.status(201).cookie("temp", "lol").json({
              success: true,
              message:"Registered successfully",
          });
  });

    //using error middleware
    app.use(errorMiddleware)
