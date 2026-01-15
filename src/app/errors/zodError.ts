import type { ZodError } from "zod";



const zodErrorFormater = (error:ZodError)=>{
const errors: Record<string,string> = {};
error.issues.forEach((issue)=>{
    const field = issue.path.join(".")
    if(!errors[field]){
        errors[field] = issue.message;
    }
})
return errors;
}

export default zodErrorFormater;