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

    res.status(200).send({message:'Review created', review})
    
}

const update = async(req,res) => {
    const {id, reviewId} = req.params
    const {content} = req.body
    const review = await Review.findById(reviewId)
    
    if(!review){
        res.status(404).json({message:`Review doesnt exist.`})
    } else {
        review.content = content
        await review.save()
        res.status(404).json({message:`Review updated successfully!`})
    }
    console.log(review)
}

const deleteReview = async(req,res) => {
    const {reviewId} = req.params;
    const review = await Review.findById(reviewId)

    if(!review){
        res.status(404).json({message:`Review doesnt exist.`})
    } else {
        await Review.findByIdAndDelete(reviewId)
        res.status(404).json({message:`Review deleted successfully!`})
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
