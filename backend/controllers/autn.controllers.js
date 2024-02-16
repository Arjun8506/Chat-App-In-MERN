import bcyptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../tokens/generateToken.js";

export const signup = async (req, res)=>{
    
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Password don't match"});
        }

        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({error: "Username already exists!"})
        }

        const salt = await bcyptjs.genSalt(10);
        const hashedPassword = await bcyptjs.hash(password, salt)

        const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newuser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilepic: gender === "male" ? boyprofilepic : girlprofilepic
        })

        if (newuser) {
            generateTokenAndSetCookie(newuser._id, res)
            await newuser.save();
            
            res.status(201).json({
                _id: newuser._id,
                fullname: newuser.fullname,
                username: newuser.username,
                profilepic: newuser.profilepic
            })
        }else{
            return res.status(400).json({error: "Invalid user data"})
        }

    } catch (error) {
        console.log("error in signup component", error.message);
        return res.status(500).json({error: "Internal Server Error!"})
    }

}

export const login = async (req, res)=>{
    
    try {
        const {username, password} = req.body;
        const validUser = await User.findOne({username})

        const validPassword = await bcyptjs.compare(password, validUser?.password || "");

        if (!validUser || !validPassword) {
            return res.status(400).json({error: "Wrong Data Entered"})
        }

        generateTokenAndSetCookie(validUser._id, res);

        res.status(200).json({
            _id: validUser._id,
            fullname: validUser.fullname,
            username: validUser.username,
            profilepic: validUser.profilepic
        })

    } catch (error) {
        console.log("error in login component", error.message);
        return res.status(500).json({error: "Internal Server Error!"})
    }

}

export const logout = (req, res)=>{
    try {
        res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in logout component", error.message);
        return res.status(500).json({error: "Internal Server Error!"})
    }
}
