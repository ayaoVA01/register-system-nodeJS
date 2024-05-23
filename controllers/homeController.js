//connect with database or fatch data base
const User = require('../models/User')

module.exports =async (req, res) =>{

    let UserData = await User.findById(req.session.userId)
    res.render('home.ejs',{
        UserData
    })
}