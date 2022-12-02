import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateCustomer, getCustomerDatasById } from "../services/auth.services";

// import { useNavigate } from "react-router-dom";
export default function EditCustomer() {
  let { id } = useParams();
console.log("lnl",id)
  let navigate = useNavigate();

  const [input, setInput] = useState({
    customername: "",
    email: "",
  });

  console.log(input);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCustomer(input, id);
      console.log(response);
      if (response.data.status === 200) {
        navigate("/manageCustomer")
      }
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    const showList = async () => {
      const result = await getCustomerDatasById(id);
      const arr = result.data.data;
      console.log(arr)
      setInput(() => ({
        customername: arr.customername,
        email: arr.email,
      }));
      console.log(arr);
    };
    showList();
  }, []);

  return (
    <>
      <div>
        {/* <h1>Edit</h1> */}
      </div>
      <div className="container mt-4">
        <ToastContainer />
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
              <h3>Update Customer</h3>
              <br />
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label>Customer Name</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="customername"
                      className="form-control"
                      onChange={handleChange}
                      name="customername"
                      value={input.customername}
                    />
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-md-4">
                    <label>Email</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="email"
                      className="form-control "
                      onChange={handleChange}
                      name="email"
                      value={input.email}
                    />
                  </div>
                </div>

                <br />

                
                <br />

                <div className="row">
                  <div>
                    <button type="submit" class="btn btn-dark">
                      Update Customer
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}