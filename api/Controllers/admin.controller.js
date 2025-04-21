// import { errorHandler } from "../utils/error";
import User  from "../models/user.model.js"

export const test = (req, res) => {
    res.json({
        message: "API is working!",
    });
};
export const getAllUsers = async (req, res,next) => {
    try {
        const users = await User.find({isAdmin:false},{password: 0,});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
export const deleteUser = async (req, res, next) => {
    try {
      
      const user = await User.findById(req.user.id);
      if (!user || !user.isAdmin) {
        return next(errorHandler(403, "Only admin can delete users"));
      }
  
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (error) {
      next(error);
    }
  };
  
  export const getEditDetails = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).select("-password"); 
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
  export const updateUserByAdmin = async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("Update Error:", error); 
      next(error);
    }
  };
  
  
  