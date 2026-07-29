import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
        unique: true,
    },
},

{
    timestamps: true,
}
    
)