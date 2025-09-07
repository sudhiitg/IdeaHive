import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment,deleteComment,getComments} from '../controllers/comment.controller.js';



const router = express.Router();
router.post('/create', verifyToken, createComment);
router.get('/getComments/:postId', getComments);
router.delete('/deleteComment/:id',verifyToken,deleteComment)


export default router;