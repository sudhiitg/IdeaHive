import express from 'express';
import {test, updateUserDislikes, updateUserLikes} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { signout } from '../controllers/auth.controller.js';
import { deleteUser,updateUser,getUser} from '../controllers/user.controller.js';

const router =express.Router();

router.get('/test',test);
router.get('/getuser',verifyToken,getUser);
router.post('/update/:id',verifyToken, updateUser);
router.post('/updateLikes/:id',verifyToken, updateUserLikes);
router.post('/updateDislikes/:id',verifyToken, updateUserDislikes);
router.delete('/delete/:id',verifyToken,deleteUser);

// router.get('/listing/:id', verifyToken, getUserListings)
//  router.get('/:id', verifyToken, getUser)
export default router ;