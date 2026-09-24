import { generateAccessToken } from "../config/jwt";
import { ConflictError } from "../errors/conflict";
import { NotFoundError } from "../errors/not-found";
import Trip from "../models/trip"
import sendMail from "../utils/sendMail";


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

export const invite = async (id, userId, collaboratorsEmails)=>{
    const trip = await findOne(id, userId);

    if( !trip ){
        throw new NotFoundError("Trip not found or you do not have access");
    }

    const check = trip.collaborators.some((c)=>{
        collaboratorsEmails.includes(c)
    })

    if(check){
        throw new ConflictError("Collaborator already invited");
    }

    const token = await generateAccessToken({tripId: id}, "1h");

    const link = `${process.env.FRONTEND_URL}/trips/${id}/invite/accept?token=${token}`;

    await sendMail(collaboratorsEmails.join(","), "Invitation to join Trip", {
        link: link,
        title: trip.title,
        startDate: trip.startDate.toDateString(),
        endDate: trip.endDate.toDateString(),
        name: trip.user.name
    })

    return { message: "Invitation sent successfully"}
}