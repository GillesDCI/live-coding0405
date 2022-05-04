import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const teaSchema = new Schema({
    name:{type:String, required:true},
    description:{type:String},
    dateCreated:{type:Date, default:Date.now},
    category:{type:String, enum:{
        values:['GREENTEA', 'OOLONGTEA', 'BIOTEA', 'ORGANICTEA'],
        message:'{VALUE} is not supported'
    }},          
    price:{type:Number},
    tags:[String] //this contains an array of strings
});

const Tea = model('Tea', teaSchema);

export default Tea;