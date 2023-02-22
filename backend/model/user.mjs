import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },// match parameter to accept email ids in proper format from given regex, which will be checked by node assert
    password:{
        type: String,
        required : true
    },
    userID:{
        type: String
    },
    recycled:{
        type: Number
    },
    compostable:{
        type: Number
    },
    hazardous:{
        type: Number
    }
})
const garbageSchema = new mongoose.Schema({
    paper:{
        type: Boolean,
        default: false,
    },
    plastic:{
        type: Boolean,
        default: false,
    },
    metals:{
        type: Boolean,
        default: false,
    },
    ewaste:{
        type: Boolean,
        default: false,
    },
    others:{
        type: Boolean,
        default: false,
    },
    location:{
        type: String,
        required: true
     },
    //  expireAt:{
    //      type: Date,
    //      expires: 10
    //  },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
     }
})
const Garbage = mongoose.model('garbage', garbageSchema)
const User = mongoose.model('user', userSchema)

export {Garbage, User}