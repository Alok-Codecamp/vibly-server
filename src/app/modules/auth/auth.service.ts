import type { ISignupData } from "./auth.interface.js";
import signupModel from "./auth.model.js";

//service function for handle signup logic
const signup = async(signUpData:ISignupData) => {
    console.log(signUpData)
    if(!signUpData.email || !signUpData.password || !signUpData.name){
        throw new Error('Missing required fields');
    }
    const result = await signupModel.create(signUpData);
    console.log(result)
    return result;
}



export const authServices =  {signup};