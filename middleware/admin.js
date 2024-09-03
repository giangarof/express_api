import asyncHandler from "./asyncHandler.js"
import ExpressError from "./ExpressError.js"
import jwt from 'jsonwebtoken'
import User from "../MCR/model/user.js"
import Post from "../MCR/model/post.js"

export const administrator = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    } else{
        throw new ExpressError('No authorized as admin', 401)
    }
}

// Protect routes users from middleware
// Check if you are logged in
export const protect = asyncHandler(async(req,res,next) => {
    let token;
    // Read the jwt from the cookie
    token = req.cookies.jwt;
    // console.log(token)
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            // req.user = decoded;
            // console.log(decoded)
            // console.log(req.user)
            res.status(200)
            next()
        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error('No authorization, token failed')
        }

    } else {
        res.status(401);
        throw new Error('No authorization allowed')
    }
})

// export const postOwner = async(req,res) => {
//     const {id} = req.params
//     const post = await Post.findById(id)
//     console.log(req.user_id, post.author)
// }