import { NotFoundError } from "../errors/not-found";
import Baggage from "../models/baggage";

export const create = async (data)=>{
    const baggage = await Baggage.create(data);
    return baggage;
}

export const index = async (userId, tripId)=>{
    const baggage = await Baggage.find({user: userId, trip: tripId});
    return baggage;
}

export const update = async (id, data, userId)=>{
    const baggage = await Baggage.findOneAndUpdate({_id: id, user: userId}, data, { returnDocument: "after"});

     if( !baggage ){
        throw new NotFoundError("Baggage not found");
    }

    return baggage;
}

export const remove = async (id, userId) => {
    const baggage = await Baggage.findOneAndDelete({_id: id, user: userId});

    if( !baggage ){
        throw new NotFoundError("Baggage not found");
    }

    return baggage;
}

export const findOne = async (id, userId)=>{
    const baggage = await Baggage.findOne({_id: id, user: userId}).populate("user", "name").populate("trip", "title");

    if( !baggage ){
        throw new NotFoundError("Baggage not found");
    }

    return baggage;
}