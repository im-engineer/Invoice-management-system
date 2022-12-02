import mongoose from "mongoose";
const invoiceSchema = new mongoose.Schema(
    {
        // customer_id :{
        //     type : String,
        //     required:false
        // },
        customername:{
            type : String,
            required:false
        },
        email:{
            type:String,
            required:false
        },  
        status:{
            type:String,
            required:false
        },
        date:{
            type:Date,
            required:true
        },
        grandtotal :{
            type:Number
        },
        item:[]
    }
)
export default mongoose.model("invoice",invoiceSchema);