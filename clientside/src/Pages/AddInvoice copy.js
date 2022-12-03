import React, { useState, useEffect } from "react";
import { getCustomerDatasById } from "../services/auth.services";
import { InvoiceAdd } from "../services/auth.services";
import { useNavigate} from "react-router-dom";
import { showlist } from "../services/auth.services";
import DatePicker from "react-datepicker";
import 'react-toastify/dist/ReactToastify.css';
export default function Addinvoice() {


  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [cust, setCustom] = useState({});
  console.log("🚀 ~ file: AddInvoice.js:14 ~ Addinvoice ~ cust", cust);
  const [status, setStatus] = useState("");


  const [grandtotal, setGrandtotal] = useState()
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    const up = async () => {
      const response = await showlist();
      setArray(response.data.result);
    };
    up();
  },[]);

  const dropdownHandler = async (e) => {
    const res = await getCustomerDatasById(e.target.value);
    setCustom(res.data.data);
    console.log(res.data.data)
  };


  const [responseMsg, setResponseMsg] = useState('');

  const addInvoic = async () => {
    const apiResponse = await InvoiceAdd(
        cust.customername,
        cust.email,
        status,
        date,
        formFields,
        grandtotal
    );
    setResponseMsg(apiResponse.data.message)
    console.log(apiResponse.data.message);
    // setShow(true);
    if (apiResponse.data.status === true) {
      navigate("/manageinvoice");
    } else {
      alert("Fill your information");
    }
   
  };

  //--------------------------------------------------------------------
  const [formFields, setFormFields] = useState([
    { productname: "", quantity: "", price: "", tax: "", total: "" },
  ]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
    let calc = (data[index].price* data[index].quantity)
      data[index].total = (calc*0.01 *data[index].tax)+calc
      console.log(calc);

      const flattenObj = data.reduce((acc, curVal) => {
        return acc + parseFloat(curVal?.total)
      }, 0);
      console.log("flattenObj", flattenObj)
      setGrandtotal(flattenObj);
    }


  const submit = (e) => {
    e.preventDefault();
    console.log("kbk",formFields);
  };



  const addFields = () => {
    let object = {
      productname: "",
      quantity: 0,
      price: 0,
      tax: 0,
      total: 0,
    };

    setFormFields([...formFields, object]);
  };
  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  console.log("hbk",formFields)

  return (
    <div className="container my-3">
    <div className="row">
      <div className="col-md-2"></div>
      <div className=" container-addinvoice col-md-8 auto-max">
      <h1>
        <center>Create Invoice</center>
      </h1>
      <hr/>

      <div className="row centered-form">
        <form onSubmit={(e) => submit(e)}>
          <div className="form-group ">
            <label>Customer Name :</label>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
            <select className="form-control" onChange={dropdownHandler}>
              <option value="⬇️ Select a Customer ⬇️">
                {" "}
                -- Select a Customer --{" "}
              </option>
              {array.map((data) => (
                <option value={data._id}>{data.customername}</option>
              ))}
            </select>
            </div>
            </div>
          </div>
                  <br/>
          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                
                  <label>Email :</label>
                      <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                    value={cust.email}
                  />
              </div>
                  
                {/* </div> */}
                {/* <div className="form-group col-sm-8"> */}
                <div className="col-md-4">
                  <label>Status</label>
                  <div className="row">
                    <div className="col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        value="paid"
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <label className="form-check-label" for="flexRadioDefault1">
                        Paid
                      </label>
                      
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        value="unpaid"
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <label className="form-check-label" for="flexRadioDefault2">
                        Unpaid
                      </label>
                      </div>
                      </div>
                 </div>
              </div>
            
          <div className="col-md-4">
          <div className="form-group">
            <label>Date :</label>
            <DatePicker selected={date} className="form-control" onChange={(date) => setDate(date)} />
          </div>
          </div>
          </div>
          </div><br/>

          {formFields.map((form, index) => {
            return (
              <div className="container">
                <div classname="row">
              <div key={index}>
                <div className="col-md-12">
                  <div className="row">
              <div className="col-md-4">
                <label>Product name:</label>
                <input
                  name="productname"
                  placeholder="productname"
                  className="form-control"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.productname}
                />
                </div>
                <div className="col-md-4">
                <label>Quantity:</label>
                <input
                  name="quantity"
                  placeholder="quantity"
                  className="form-control"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.quantity}
                />
                </div>
                <div className="col-md-4">
                <label>Price:</label>
                <input
                  name="price"
                  placeholder="price"
                  className="form-control"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.price}
                />
                </div>
                </div>
              </div>
              </div>
              </div><br/>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-4">
                  <label>Tax:</label>
                  <input
                    name="tax"
                    placeholder="tax"
                    className="form-control"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.tax}
                  />
                  </div>
                  <div className="col-md-4">

                  <label>Total:</label>
                  <input
                    name="total"
                    placeholder="total"
                    className="form-control"
                    value={form.total}
                  />
                  </div> <br/>
                  <div className="col-md-4">
                  <label>Grand Total :</label>
                  <input
                        type="text" name="grandtotal"
                        class="form-control"
                        value={grandtotal}
                      /> <br/>
                      
                <button onClick={() => removeFields(index)}>Remove</button></div>
                
                </div>
                <br/>
                </div>
              </div>
             
            );
          })}
          <div>
          </div>
        </form>
        <div className="row">
          <div className="col-md-4">
        <button onClick={addFields}>Add More..</button></div>

        <div className="col-md-4">
        <button onClick={addInvoic}>Submit</button>
        </div>

        </div>

        {<b className="text-info">{responseMsg}</b>}

      </div>
    </div>
    <div className="col-md-3"></div>
    </div>
    </div>
  );
}



