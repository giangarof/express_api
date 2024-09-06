import Review from "../model/review.js";
import Post from "../model/post.js"
import User from "../model/user.js"


const create = async(req,res) => {
    // find the post
    const {id} = req.params;
    const post = await Post.findById(id)

    // get the content from the body.
    const content = req.body;
    const review = new Review(content)

    // get the author
        const author = req.user
        const user = await User.findById(author._id)
        review.author = {_id: author._id, name: author.name};
    // post.reviews = {_id: author._id, name: author.name};
    // review.author = user

    // review
    // post.reviews.push({ 
    //     _id: author._id,
    //     name: author.name,
    // })
    // post.reviews.push({_id:content._id, name: author.name})
    post.reviews.push(review)
    await post.save()
    await review.save()

    // console.log(review)

    res.status(200).send({message:'Review created', post})
    
}

const update = async(req,res) => {
    const {id} = req.params
    const review = await Review.findById(id)
    console.log(review)
}

const deleteReview = async(req,res) => {
    const {id} = req.params;
    const review = await Review.findById(id)
    if(!review){
        res.status(404).json({message: `Review doesn't exist`})
        
    } else{
        res.status(20).json({review})
    }

}

const like = async(req,res) => {

}

export {
    create,
    update,
    deleteReview,
    like
}
