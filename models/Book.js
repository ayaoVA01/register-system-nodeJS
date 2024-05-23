const mongoose =require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },

    catagory:String,
    title: String,
    author: String,
    description:String,
});
// books table 


// Create model for the books collection
const Book = mongoose.model('Book', bookSchema);
module.exports =Book

