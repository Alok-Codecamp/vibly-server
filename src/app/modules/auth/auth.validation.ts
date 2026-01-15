import z from "zod";
 
 const signUp = z.object({ 
    firstName: z.string({message: "First name is required"}).min(2,{message:"First name must be at least 2 characters long"}).max(30,{message:"First name must be at most 30 characters long"}),
    lastName: z.string({message:"Last name is required"}).min(2,{message:"Last name must be at least 2 characters long"}).max(30,{message:"Last name must be at most 30 characters long"}),
    dob: z.string({message:"Date of birth is required"}).min(10,{message:'Date of birth must be in the format DD-MM-YYYY'}).max(10),
    email: z.string({message:"Email is required"}).email({message:"Invalid email address"}),
    password: z.string({message:"Password is required"}).min(8,{message:"Password must be at least 8 characters long"}).max(100),
    
});

const signIn = z.object({
    email: z.string({message:"Email is required"}).email({message:"Invalid email address"}),
    password: z.string({message:"Password is required"}).min(8,{message:"Password must be at least 8 characters long"}).max(100),
});

export const authValidation = {
    signUp,
    signIn
};