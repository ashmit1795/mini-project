import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    },
    refreshToken: {
        type: String,
        default: null
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
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

// Generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { 
            id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { 
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
        }
    )
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { 
            id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { 
            expiresIn: process.env.REFRESH_TOKEN_LIFE,
        }
    )
}

export const User = mongoose.model('User', userSchema);