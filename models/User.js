import mongoose from 'mongoose';

const {Schema, model} = mongoose;


const userSchema = new Schema({
    dateCreated:{type:Date, required:true, default:Date.now},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})


const User = model('User', userSchema);

export default User;