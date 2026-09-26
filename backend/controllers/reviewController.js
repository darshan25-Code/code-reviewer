const codeReviewModel = require('../models/CodeReview')

const createReview = async (req,res)=>{
    try{
        const {code , language} = req.body

        if(!code && !language){
            return res.status(401).json({
                message : "code and review required"
            })
        }

        const newReview = await codeReviewModel.create({
            user : req.userId,
            code,
            language
        })

        res.status(201).json({
            message : "Code review created successfully",
            review : newReview
        })
    }
    catch(error){
        res.status(500).json({
            message : "Server error",
            error : error.message
        })
    }
}

const getReviews = async(req,res)=>{
    try{

        const reviews =await codeReviewModel.find({user : req.userId})

        res.status(200).json({
            success : true,
            reviews
        })
    }
    catch(error){
       res.status(500).json({
         message : "Server error",
        error : error.message
       })
    }
}

const getReviewById = async (req,res)=>{

   try{
     const review = await codeReviewModel.findById({
        _id : req.params.id,
        user : req.userId
    })

    if(!review){
        return res.status(401).json({
            message : "Review not found"
        })
    }
    res.status(200).json({
        message : "Review found Successfully",
        review
    })
   }
   catch(error){
    res.status(500).json({
        message : "Server error",
        error : error.message

    })
   }
}

const deleteReview = async (req,res)=>{
    try{

        const review = await codeReviewModel.findOneAndDelete({
            _id : req.params.id,
            user : req.userId
        })

         if(!review){

            return res.status(404).json({

                success : false,
                message : "Review not found"

            })

        }

        res.status(200).json({

            success : true,
            message : "Review deleted successfully"

        })
    }
    catch(error){
        res.status(500).json({
            message : "Server error",
            erroe: error.message
        })
    }
}

module.exports = {createReview, getReviews,getReviewById, deleteReview}