import React, { useState} from "react";
import { useNavigate} from "react-router-dom";
import { addCustomer} from "../services/auth.services";

export default function AddCustomer() { 

  
  const navigate = useNavigate();
  const [responseMsg, setResponseMsg] = useState('');
  const [valid, setValid] = useState({
    customername:true,
    email: true,
    customernameError:"",
    emailError: "",
  });

  const [input, setInput] = useState({
    customername:"",
    email: "",
    
});

  const emailValidation = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailIsValid = pattern.test(email);

    if (emailIsValid) {
      setValid((previousValue) => ({
        ...previousValue,
        email: true,
        emailError: "",
      }));
    } else {
      setValid((previousValue) => ({
        ...previousValue,
        email: false,
        emailError: "Please enter your email address",
      }));
    }
  };


  const customerValidation = (customername) => {
    if(customername.length === 0 ){
      setValid((previousValue) => ({
        ...previousValue,
        customername:false,
        customernameError:"Please enter your name"
      }))
    }else{
      setValid((previousValue) => ({
        ...previousValue,
        customername:true,
        customernameError:""
      }))
    }
  }

  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((previousValue) => ({
      ...previousValue,
      [name]: value,
    }));
  };

  const customerAdd = async () => {
    console.log(input);

    const apiResponse = await addCustomer( input.customername, input.email);
    setResponseMsg(apiResponse.data.message)

    if (apiResponse.data.status === true) {
      navigate("/manageCustomer");
    } else {
      alert("Fill your information");
    }
    
  };



  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="form-control">
              <section>
                <h3 className="text-center">Add Customer</h3><hr/>
                <form onSubmit={(e) => handleSubmit(e)}>
                <label> Customer Name </label>
                  <input
                    className="form-control"
                    name="customername"
                    placeholder="Enter your customer"
                    onBlur={(e) => customerValidation(e.target.value)}
                    onChange={(e) => handleChange(e)}
                  />
                  {!valid.customername && (
                    <span className="text-danger">{valid.customernameError}</span>
                  )}
                  <br />
                  <label> Email Address </label>
                  <input
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    onBlur={(e) => emailValidation(e.target.value)}
                    onChange={(e) => handleChange(e)}
                  />
                  {!valid.email && (
                    <span className="text-danger">{valid.emailError}</span>
                  )}
                  <br />


                  
                  <button
                    className="btn md-2 btn-outline-primary btn-center"
                    onClick={customerAdd}
                  >
                    Submit
                  </button>
                  
                  {<b className="text-info">{responseMsg}</b>}
                </form>
              </section>
            </div>
          </div>
          <div className="col-md-4"></div>

        </div>
      </div>
    </>
  );
}