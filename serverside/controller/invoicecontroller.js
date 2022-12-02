import mongoose from "mongoose";
import invoice from '../model/invoicemodel'
import paginate from 'mongoose-paginate-v2';
import jsPDF from "jspdf";
import 'jspdf-autotable'
import {sentEmail} from  '../middleware/sendmail'

//---------------------- invoice details  ----------------------------
export const invoiceAdd = async(req,res) => {
    try{
        const invoiceDetails = new invoice ({
            customername:req.body.customername,
            email:req.body.email,
            date:req.body.date,
            status:req.body.status,
            grandtotal:req.body.grandtotal,
            item:req.body.item
        })
        const invoiceData = await invoiceDetails.save();

          const pdf = new jsPDF({ orientation: "portrait",  unit: "cm", format: "a4", marginLeft : "20" }); 
            pdf.setFontSize(18); 
            const title ="Invoice Details"; 
            const headers = [["Sr. No.", "Customer Name","Status","Grand Total"]] 
            const data = req.body.item.map((data,index)=>[ 
             index+1, 
             req.body.customername, 
             req.body.status, 
             req.body.grandtotal, 
             ]); 
             let content = { startY:50, theme:"grid", head: headers, body:data }   
          // pdf.text(title,40); 
             pdf.autoTable(content); 

             pdf.save("output/Invoice.pdf");

        const arr = invoiceData.item.map((data)=>{
            return `<div>
              <table border="1">
                <thead>
                  <tr>
                    <th>productname</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>tax</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${data.productname}</td>
                    <td>${data.price}</td>
                    <td>${data.quantity}</td>
                    <td>${data.tax}</td>
                  </tr>
                </tbody>
              </table>
            </div>`
          })
             sentEmail('azmsiddhant1@gmail.com',req.body.email,`Welcome ${req.body.customername}`,
            `invoice data
            Customer name:${invoiceData.customername}
             Status:${invoiceData.status}
             Grand Total : ${invoiceData.grandtotal}
             ${arr}`)
            // {filename:"invoice.pdf"})

             res.send({
            status : true,
            message : "customer added successfully",
            result : invoiceData
        })
        
    }catch(e){
        throw e
    }
}


//----------------------------- Show Invoice List with applying query ------------------------------
export const showInvoiceList = async (req,res) => {
    try{
    let Details = await invoice.paginate({},
        {
        sort:{productname:req.body.sort},
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


//------------------------------- Show All invoice List ------------------------
export const invoiceList = async(req,res) =>{
    try{
        let Details = await invoice.find()
        res.send({status:true,message:"customer list",result:Details})
    }
    catch(e){
        throw e
    }
}


//------------------------- Print Invoice Details with the help of id --------------------------
export const getInvoiceDataById = async (req, res) => {
    try {
        // const { _id } = req.query;
        // console.log(_id);
        const {id} = req.params;
        const data = await invoice.findById({_id:id});
        res.send({ status: true, message: "Customer Data", code: 200, data: data })
    }
    catch (e) {
        return res.send({ status: false, message: "Error", code: 404 })
    }
}


//-------------------------------- Update Invoice Details --------------------------------------
export const updateInvoice = async (req,res) => {
    try{
        let jsondata = {};  
        if(req.body.customername){
            jsondata.customername = req.body.customername;
        }
        if(req.body.status){
            jsondata.status = req.body.status;
        }
        if(req.body.email){
            jsondata.email = req.body.email;
        }
        if(req.body.date){
            jsondata.date = req.body.date;
        }
        if(req.body.item){
            jsondata.item = req.body.item;
        }
        if(req.body.grandtotal){
            jsondata.grandtotal = req.body.grandtotal;
        }
        invoice.updateOne({
            _id:mongoose.Types.ObjectId(req.body._id)
        },
        {$set : jsondata},
        {new : true},
        (err, result) => {
            if(err){
                res.send ({status:true,message:"Invoice details not updated ",result:err})

            }else{
                res.send ({status:true,message:"Invoice details updated successfully",result:result})

            }
        })
    }catch(e){
        throw e
    }
}


//----------------------------------- Delete Invoice from Database -----------------------------

export const deleteInvoice = async(req,res) => {
    try{
        let _id = req.params._id
        console.log(_id)
        const Invoice = await invoice.deleteOne({_id:mongoose.Types.ObjectId(_id)})
        if(Invoice){
            res.send({
                status : true,
                message:"success",
                result:Invoice
            })
        }
    }catch(e){
        throw e
    }
}

// export const getInvoicePaid = async(req,res) => {
//     const paidInvoice = await invoice.find({status:"paid"});
// }