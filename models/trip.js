import { model, Schema } from "mongoose";

const expensesSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const budgetSchema = new Schema({
    total: {
        type: Number,
        trim: true,
        required:true
    },
    spent: {
        type: Number,
        default: 0,
    },
    expenses: [expensesSchema]

})

const tripSchema = new Schema({
    title: {
        type: String,
        required: true, 
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
        trim: true
    },
    endDate: {
        type: Date,
        required: true,
        trim: true
    },
    destinations: [{
        type: String,
        required: true,
        trim: true
    }],
    budget: budgetSchema,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    collaborators: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
})

const Trip = model("Trip", tripSchema);

export default Trip;
