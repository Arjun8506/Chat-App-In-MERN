import User from "../models/user.model.js";

export const getUersForSideBar = async (req, res) => {
    try {
        
        const loggedInUser = req.user._id;
        const filteredUers = await User.find({_id: {$ne : loggedInUser}}).select("-password")

        res.status(200).json(filteredUers);

    } catch (error) {
        console.log("error in userRoutes in userController component", error.message);
        return res.status(500).json({error: "Internal Server Error!"})
    }
}