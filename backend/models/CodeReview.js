const mongoose = require('mongoose')

const codeReviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    code : {
        type : String,
        required : true
    },
    language : {
        type : String,
        required : true
    },
    review : {
        type : Object,
        default : {}
    }
},{
    timestamps: true
})

const codeReviewModel = mongoose.model('CodeReview',codeReviewSchema)

module.exports = codeReviewModel