import { model, Schema } from "mongoose";
import type { IResetPasswordData, ISignupData } from "./auth.interface.js";
import { config } from "../../config/config.js";
import bcrypt from "bcrypt";





// signup schema

export const SignupSchema = new Schema<ISignupData>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
})

export const ResetPasswordSchema = new Schema<IResetPasswordData>({
    newPassword: { type: String, required: true },
   
});

// pre save hook to hash password
SignupSchema.pre<ISignupData>("save", async function (next) {
    // hashing password before saving user
    const plainTextPassword = this.password;
    const saltRounds = parseInt(config.saltRounds || "10", 10);
    const hashedPassword = await bcrypt.hash(plainTextPassword,saltRounds,);
    this.password = hashedPassword;
});

// post save hook to remove password from returned document
SignupSchema.post("save", function (doc) {
 this.password = ""
})

// pre save hook to hash new password
ResetPasswordSchema.pre("save",async function(){
    const plainTextPassword = this.newPassword;
    const saltRounds = parseInt(config.saltRounds || "10", 10);
    const hashedPassword = await bcrypt.hash(plainTextPassword,saltRounds);
    this.newPassword = hashedPassword;
})



// create user model
const userModel = model<ISignupData>("user", SignupSchema);


export default userModel;