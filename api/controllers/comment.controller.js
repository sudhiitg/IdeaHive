import Comment from '../models/comment.model.js';
import { errorHandler } from '../utils/error.js';
export const createComment = async (req, res,next) => {
  const { postId, userId, content } = req.body;

  if (!postId || !userId || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newComment = new Comment({
      postId,
      userId,
      content,
    });

    await newComment.save();
    res.status(201).json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const getComments= async(req,res,next)=>{

    try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    }).limit(3);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}
export const deleteComment = async (req, res,next) => {
  try{
  
    const comment  =await Comment.findById(req.params.id);
    
    if(!comment){
        return res.status(404).json({message:"Comment not found"});
    }
    if(req.user.id!==comment.userId) return next(errorHandler(401, " You can only delete your own comment"));
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Comment deleted successfully"});
    
    
  }catch(error){
    next(error);
  }



}