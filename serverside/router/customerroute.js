import express from 'express';
import {addCustomer, showCustomerList, customerList, getCustomerById, updateCustomer, deleteCustomer, countData} from '../controller/customercontroller'
const router = express.Router();

router.post("/addCustomer",addCustomer)
router.get("/showCustomerList",showCustomerList)
router.get("/customerList",customerList)
router.get("/getCustomerById/:id",getCustomerById)
router.put("/updateCustomer",updateCustomer)
router.delete("/deleteCustomer/:_id",deleteCustomer)
router.get("/countdata",countData);
export default router;