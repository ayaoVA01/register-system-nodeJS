const mongoose =require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt') // ການເຂົ້າລະຫັດ


const UserSchema = new Schema({
    username:{
        type:String,
        required:[true, 'Please provide username']
    },
    email:{
        type:String,
        required:[true, 'Please provide email']
    },
    password:{
        type:String,
        required:[true, 'Please provide password']
    }
})

// ກ່ອນຈະມີການບັນຖຶກໄວໃນຖານຂໍໍ້ມູນຈະມີການເຂົົ້າລະຫັດກ່ອນ
UserSchema.pre('save', function(next){
    const user = this // this mean Userschema function
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next()
    }).catch(error =>{
        console.error(error)
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User


