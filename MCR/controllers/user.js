import User from "../model/user.js";
import { generateToken } from "../../config/token.js";

const login = async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    // console.log(user)
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id)
        res.status(200).send({profile: user})
    } else{
        res.status(404).send(`User not found.`)
    }
}

const signup = async (req,res) => {
    const {name, username, email, password} = req.body;

    try {
        const verifyIfEmailExits = await User.findOne({email})
        
        if(verifyIfEmailExits){
            res.status(400)
            throw new Error('Email already in use. Please, use another email.')
        } else {
            const newUser = await User.create({
                name, username, email, password
            })
            res.status(201).json(newUser)

        }
    } catch (error) {
        throw new Error(error)
    }

}

const logout = async (req,res) => {
    res.cookie('jwt', '', {
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).send('log out')
}

const update = async (req, res) => {
    const {id} = req.params;
    const {
        name, username, password, confirmPassword, email
    } = req.body;
    const user = await User.findById(id)
    const verifyIfEmailExits = await User.findOne({email})
   
    // Image Update
    const imgs = req.files.map(f => ({
        url: f.path, 
        filename: f.filename, 
        originalname: f.originalname
    }));

    // If user doesnt exist
    if(!user){
        res.status(404).send(`user dont exist.`)
    }
    
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
        await user.updateOne({$pull: {profileImage: {filename: { $in: req.body.deleteImages}}}})
    }
    
    if (imgs.length > 0) {
        user.profileImage = imgs;
    }

    // check for password
    if (password != confirmPassword){
        res.status(404).send(`Passwords dont match`)


    // verify email
    } else if (verifyIfEmailExits && verifyIfEmailExits._id.toString() !== id){
        res.status(400).send(`'Email already in use. Please, use another email.'`)

    // if user does exist
    } else if (user){
        user.name = name;
        user.username = username;
        user.password = password;
        user.email = email;
        await user.save()
        res.status(200).json({user})
    } else{
        res.status(404).send(`something went wrong, try again later.`)
    }
    
}

const getAll = async(req,res) => {
    const users = await User.find({})
    // console.log(users)
    res.status(200).json(users)
}

const deleteUser = async(req,res) => {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
        res.status(400).json({message:'user already deleted, or user doesnt exist.'})
    } else {
        res.status(200).json({message:'User deleted successfully'});
        console.log(user)
    }
}


export {
    login, 
    signup,
    logout,
    update,
    getAll,
    deleteUser,
}