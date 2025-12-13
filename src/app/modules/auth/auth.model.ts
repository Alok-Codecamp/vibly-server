// shcema for auth module

import { model, Schema } from "mongoose";
import type { ISignupData } from "./auth.interface.js";



// signup schema

export const SignupSchema = new Schema<ISignupData>({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
})


const signupModel = model<ISignupData>("Signup", SignupSchema);

export default signupModel;