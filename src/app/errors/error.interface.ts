export interface IError {
    success: boolean;
    statusCode: number;
    name: string;
    message: string;
    stack?: string;
    code?: number;
    errmsg?: string;
    keyValue?: Record<string, any>;
    };
