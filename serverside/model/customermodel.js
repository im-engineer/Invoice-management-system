import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';
const customerSchema = new mongoose.Schema(
    {
        customerid :{
            type : mongoose.ObjectId
        },
        customername : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        }
    }
)
customerSchema.plugin(paginate);
export default mongoose.model("customer",customerSchema);