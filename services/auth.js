import { compare } from "bcrypt";
import { generateAccessToken } from "../config/jwt.js";
import User from "../models/user.js";
import { create } from "./user.js"
import { UnauthorizedError } from "../errors/unauthorized.js";

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