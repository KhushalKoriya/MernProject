import mongoose from "mongoose";
import bcrypt from "bcryptjs";

var UserSchema = new mongoose.Schema({
            username: { type: String, required: true },
            email: {type: String, required: true,index: { unique: true }},
            password: { type: String, required: true },
            isAdmin : {type: Boolean,default: false},
            active: {type: Boolean, default: true},
    }, {
        timestamps: true,
        versionKey: false,
    });

 UserSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
 })   

var userModel = mongoose.model("User", UserSchema);
export default userModel;