module.exports = (req,res, next)=>{
    if(req.session.userId){
        return res.redirect('/')
    }
    next()
}

//this one using after login and refuse the page path 