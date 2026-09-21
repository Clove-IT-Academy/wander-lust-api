import { model, Schema } from "mongoose";


const BaggageSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    trip: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true,
}
)

const Baggage = model("Baggage", BaggageSchema);

export default Baggage;