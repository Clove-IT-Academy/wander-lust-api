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
    return trip;
}