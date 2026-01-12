


class AppError extends Error{
    public statusCode: number;
    public success: boolean;

    constructor(success:boolean,statusCode:number,message:string){
        super(message);
        this.statusCode=statusCode;
        this.success=false;
        
        Object.setPrototypeOf(this,AppError.prototype);
    }

}

export default AppError;