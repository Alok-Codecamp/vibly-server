import { Model } from "mongoose";

// User interface definition
 export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest'
}
export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    isActive: boolean;
}

export interface IUserModel extends Model<IUser> {
    isPasswordMatched(email:string,plainTextPassword:string):Promise<boolean>;
}