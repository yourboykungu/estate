import mongoose from "mongoose";

const userScheme= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, email: {
        type: String,
        required: true,
        unique: true
    }, password: {
        type: String,
        required: true,
    }
})

const User= new mongoose.model('User',userScheme);

export default User;