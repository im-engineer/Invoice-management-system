import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userlogout } from "../Slice/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const userdata = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handellogout = () => {
    dispatch(userlogout());
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <header id="header ">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />

        <nav className="navbar navbar-expand-lg navbar-dark ">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={"data:image/jpeg;base64,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"} alt="" style={{height:"10vh",width:"10vh"}}/> 
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="text-right">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto ">
                  {userdata.isLoggedIn ? (
                    <div>
                      <Link className="navbar-brand" to="/home">
                        <i class="fa-solid fa-house-user"></i>
                      </Link>

                      <Link className="navbar-brand" to="/contact">
                        <i class="fa-solid fa-envelopes"></i>
                      </Link>
                      <button
                        className="btn btn-md btn-danger"
                        onClick={handellogout}
                      >
                        <i class="fa-solid fa-power-off"></i>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Link className="navbar-brand" zc to="/home">
                        <i class="fa fa-solid fa-house-user"></i>
                      </Link>
                      <Link className="navbar-brand" to="/">
                        
                      </Link>

                      <Link className="navbar-brand" to="/contact">
                        <i class="fa-solid fa-envelopes"></i>
                      </Link>
                      <Link className="navbar-brand" to="/login">
                        <i class="fa fa-solid fa-right-to-bracket"></i>
                      </Link>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Navbar;
