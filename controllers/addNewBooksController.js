const Books = require('../models/Book');

module.exports = (req,res)=>{
    Books.create(req.body).then(()=>{
        console.log("Add book successfully! ")

        res.redirect('/')
    }).catch((error)=>{
        if(error){
            const bookError = Object.keys(error.errors).map(key=>errors.message)
            req.flash('bookError', bookError)
            req.flash('data',req.body)
            return res.resdirect('/addBooks')
        }
    })
}