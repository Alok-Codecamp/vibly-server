import { model, Schema } from "mongoose";
import { UserRole, type IUser, type IUserModel } from "./user.interface.js";
import { config } from "../../config/config.js";
import bcrypt from "bcrypt";


const UserSchema = new Schema<IUser,IUserModel>({
    id: { type: Number, required:true, unique: true ,default:0},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true},
    role:{type:String,required:true,enum:['admin','user','guest'],default:UserRole.USER},
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
})

UserSchema.pre("save", async function (next) {
    // hashing password before saving user
    const plainTextPassword = this.password;
    const saltRounds = parseInt(config.saltRounds as string);
    console.log(saltRounds,plainTextPassword)
    const hashedPassword = await bcrypt.hash(plainTextPassword,saltRounds,);
    this.password = hashedPassword;
});

UserSchema.statics.isPasswordMatched = async function (email:string,plainTextPassword:string):Promise<boolean>{

const user  = await this.findOne({email}).exec();
if(!user) return false;
// compare passwords
const isMatched = await bcrypt.compare(plainTextPassword,user.password);
return isMatched;
}

// post save hook to remove password from returned document
UserSchema.post("save", function (doc) {
 this.password = ""
})




// create user model
export const UserModel = model<IUser>('user',UserSchema)
