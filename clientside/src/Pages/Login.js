import { login } from "../services/auth.services";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userlogin } from "../Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });


  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if(isLoggedIn){
      navigate("/dashboard")
    }
  }, [])

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
      const response = await login(input);
      if (response.data.status === true) {
        // action dispatch
        dispatch(userlogin(response.data.result));
        // console.log("siddhant",response.data.result)

        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/dashboard");
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="container-login">
      <ToastContainer />
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
                    <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Login Form</h3><hr/>
                                <br />
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-4">
                                        <label>Email</label>
                                        </div>
                                        <div className="col-md-8">
                                        <input type="email" className="form-control" onChange={handleChange} name="email"/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-4">
                                        <label>Password</label>
                                        </div>
                                        <div className="col-md-8">
                                        <input type="password" className="form-control" onChange={handleChange} name="password"/>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div>
                                        <button type="submit" className="login-btn">
                                            Login
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-md-6">
                              <img style={{height:"100%",width:"40vh"}}src={"https://kinaracapital.com/wp-content/uploads/2022/06/Invoice-Image3.jpg"} alt=""/>
                            </div>
                        </div>
                    </form>    
            </div>
        </div>
    </div>
  );
}
