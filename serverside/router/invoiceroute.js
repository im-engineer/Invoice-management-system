import express from 'express';
import {invoiceAdd, showInvoiceList, invoiceList, getInvoiceDataById, updateInvoice, deleteInvoice} from '../controller/invoicecontroller'
const router = express.Router();

router.post("/invoiceAdd",invoiceAdd)
router.get("/showInvoiceList",showInvoiceList)
router.get("/invoiceList",invoiceList)
router.get("/getInvoiceDataById/:id",getInvoiceDataById)
router.put("/updateInvoice",updateInvoice)
router.delete("/deleteInvoice/:_id",deleteInvoice)
export default router;