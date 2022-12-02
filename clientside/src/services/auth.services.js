import axios from "axios";

let axiosConfig = {
    headers:{
        'Content-Type' : 'application/json',
    }
}
const API_URL = "http://localhost:3456/";


//----------------------------- login ---------------------------------
export const login = async ({email,password}) => {
    try{
        const response =  await axios.post (API_URL + "admin/adminlogin",{
            email,
            password
                },axiosConfig)
                if(response.data.status ){
                    localStorage.setItem('users',JSON.stringify(response.data));
                    
                    return response   
                }else{
                    return response;
                }

    }catch(e){
            return null;
    }
}


export const showlist = async () => {
    return axios.get(
        API_URL + "customer/customerList", axiosConfig
    )
}

export const deleteCustomer = async (_id) => {
    console.log(_id)
    return await axios.delete(API_URL + `customer/deleteCustomer/${_id }`, axiosConfig)
}

export const addCustomer = async (customername,email) => {
    console.log(addCustomer);
    return axios.post(
        API_URL + "customer/addCustomer",
        {
            customername,
            email
        },
        axiosConfig
    )
}

export const getCustomerDatasById = async (id) => {

    return axios.get(API_URL + `customer/getCustomerById/${id}`, axiosConfig)
}

export const updateCustomer = async (data, _id) => {
    console.log(data);
    console.log(_id)
    return await axios.put(API_URL + "customer/updateCustomer", {
        _id,
        customername:data.customername,
        email:data.email
    }, axiosConfig)
}

export const showinvoicelist = async () => {
    return axios.get(
        API_URL + "invoice/invoiceList", axiosConfig
    )
}

export const getInvoiceDataById = async (id) => {

    return axios.get(API_URL + `invoice/getInvoiceDataById/${id}`, axiosConfig)
}

export const deleteInvoice = async (_id) => {
    console.log(_id)
    return await axios.delete(API_URL + `invoice/deleteInvoice/${_id }`, axiosConfig)
}

export const countList = async() => {
    try{
        const list = await axios.get(API_URL + "customer/countdata",axiosConfig
        )
        return list
    }catch(e){
        throw e
    }
}



export const InvoiceAdd= async (customername,email,status,date,formFields,grandtotal)=>{
   console.log(formFields)
   return axios.post(
    API_URL + "invoice/invoiceAdd",
    {
    //   customer_id,
     customername,
     email,
     status,
     date,
     item:formFields,
     grandtotal
    },
    axiosConfig
  );
  }

  export const UpdateInvoice = async (_id,customername,status,item,grandtotal) => {
    console.log(_id)
    return await axios.put(API_URL + "invoice/updateInvoice", {
        _id,
        customername,
        status,
        item,
        grandtotal
    }, axiosConfig)
}