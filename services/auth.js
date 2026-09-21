import { compare } from "bcrypt";
import { generateAccessToken } from "../config/jwt";
import User from "../models/user";
import { create } from "./user"
import { UnauthorizedError } from "../errors/unauthorized";

export const register = async (data)=>{
    const user = await create(data);
    const token = generateAccessToken({userId: user._id, name: user.name});

    return token;
}

export const login = async (data)=>{
    const user = await User.findOne({email: data.email});

    if(  !compare(data.password, user.password) ){
        throw new UnauthorizedError();
    }

    const token = generateAccessToken({userId: user._id, name: user.name});

    return token;

}