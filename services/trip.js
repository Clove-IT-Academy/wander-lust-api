import { NotFoundError } from "../errors/not-found";
import Trip from "../models/trip"


export const create = async (data)=>{
    const trip = await Trip.create(data);
    return trip;
}

export const index = async (userId)=>{
    const trip = await Trip.find({user: userId});
    return trip;
}

export const update = async (id, data, userId)=>{
    const trip = await Trip.findOneAndUpdate({_id: id, user: userId}, data, { returnDocument: "after"});

     if( !trip ){
        throw new NotFoundError("Trip not found");
    }

    return trip;
}

export const remove = async (id, userId) => {
    const trip = await Trip.findOneAndDelete({_id: id, user: userId});

    if( !trip ){
        throw new NotFoundError("Trip not found");
    }

    return trip;
}

export const findOne = async (id, userId)=>{
    const trip = await Trip.findOne({_id: id, user: userId}).populate("user", "name").populate("collaborators", "name email");

    if( !trip ){
        throw new NotFoundError("Trip not found");
    }

    return trip;
}