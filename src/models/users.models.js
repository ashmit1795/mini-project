import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Check if the password is correct
userSchema.methods.isPasswordCorrect = async (plainPassword) => {
    bcrypt.compare(plainPassword, this.password, function(err, result) {
        if (err) throw err;
        return result;
    });
}

export const User = mongoose.model('User', userSchema);