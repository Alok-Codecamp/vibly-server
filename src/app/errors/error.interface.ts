export interface IError {
    success: boolean;
    statusCode: number;
    name: string;
    message: string;
    stack?: string;
    errors?: Record<string, string>;
    code?: number;
    keyValue?: Record<string, any>;
    };
