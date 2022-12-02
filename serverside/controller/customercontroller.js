import mongoose from "mongoose";
import customer from '../model/customermodel'
import paginate from 'mongoose-paginate-v2';
import {sentEmail} from  '../middleware/sendmail'
import invoice from '../model/invoicemodel'

//---------------------- Adding Customer ----------------------------
export const addCustomer = async(req,res) => {
    try{
        const customerDetails = new customer ({
            customername : req.body.customername,
            email : req.body.email,
        })
        const customerData = await customerDetails.save();
        var emailDetails = await sentEmail('azmsiddhant1@gmail.com',
                                            req.body.email,
                                            `Welcome ${customerData.customername}`,
                                            `Your Details :
                                            email:${customerData.email},
                                            password:${customerData.password}`
                                            )

        if(customerData){
        return res.send({
            status : true,
            message : "customer added successfully",
            result : emailDetails
        })}
    }catch(e){
        throw e
    }
}


//----------------------------- Show Customer List with applying query ------------------------------
export const showCustomerList = async (req,res) => {
    try{
    let Details = await customer.paginate({},
        {
        sort:{customername:req.body.sort},
        page:req.body.page,
        limit:req.body.limit
        },
        (err,result)=>{
            console.log(result)
            res.send({status:400,message:"successfull",result:result})
        })
    }catch(e){
        throw e
    }
}


//------------------------------- Show All Customer List ------------------------
export const customerList = async(req,res) =>{
    try{
        let Details = await customer.find()
        res.send({status:true,message:"customer list",result:Details})
    }
    catch(e){
        throw e
    }
}


//------------------------- Print Customer Details with the help of id --------------------------
export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("kbkb",id);
        const data = await customer.findById({_id:id});
        console.log("nlk",data)
        res.send({ status: true, message: "Customer Data", code: 200, data: data })
    }
    catch (e) {
        return res.send({ status: false, message: "Error", code: 404 })
    }
}


//-------------------------------- Update Custome Details --------------------------------------
export const updateCustomer = async (req,res) => {
    try{
        let jsondata = {};  
        if(req.body.customername){
            jsondata.customername = req.body.customername;
        }
        if(req.body.email){
            jsondata.email = req.body.email;
        }
        if(req.body.password){
            jsondata.password = req.body.password;
        }
        customer.updateOne({
            _id:mongoose.Types.ObjectId(req.body._id)
        },
        {$set : jsondata},
        {new : true},
        (err, result) => {
            if(err){
                res.send ({status:200,message:"Customer details not updated ",result:err})

            }else{
                res.send ({status:200,message:"Customer details updated successfully",result:result})

            }
        })
    }catch(e){
        throw e
    }
}


//----------------------------------- Delete Customer from Database -----------------------------
export const deleteCustomer = async(req,res) => {
    try{
        let _id = req.params._id
        console.log(_id)
        const Customer = await customer.deleteOne({_id:mongoose.Types.ObjectId(_id)})
        if(Customer){
            res.send({
                status : true,
                message:"success",
                result:Customer
            })
        }
    }catch(e){
        throw e
    }
}

//------------------------- count invoice ------------------------------------------
export const countData = async(req,res) => {
    try{
        let invoiceDetail = await customer.find({})
        const estimate1 = await customer.estimatedDocumentCount();
        const estimate2 = await invoice.estimatedDocumentCount();
        const countpaid = await invoice.countDocuments({status:"paid"});
        const countunpaid = await invoice.countDocuments({status:"unpaid"});

        res.send({
            status : 200,
            message :"Invoice List",
            result:estimate1,
            data:estimate2,
            paid:countpaid,
            unpaid:countunpaid
        })

    }catch(e){
        throw e
    }
}