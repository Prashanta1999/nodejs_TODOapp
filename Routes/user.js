import  express  from "express";
import { User } from "../models/user.js";
import { getAllusers, getMyProfile, register,login, logout} from "../controllers/user.js";
import { isAuthenticated } from "../MiddleWares/auth.js";


const router = express.Router();

router.get('/all',getAllusers);

router.post('/new', register);
router.post('/login', login);
router.get('/logout', logout);
router.get("/me",isAuthenticated,getMyProfile);
// .put(UpdateUser)
// .delete( DeleteUser);


export default router;

