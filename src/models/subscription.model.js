import mongoose , {Schema} from "mongoose"

const subscriptionSchema = new Schema({
    subscriber:{
        type:Schema.Types.ObjectId, // onee who is subscribing
        ref:"User"
    },

    channel:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    
},{timestamps: true})


export const Subscription = mongoose.model("String" , subscriptionSchema ) 