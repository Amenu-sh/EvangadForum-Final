import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
// import { IconButton } from "@mui/material";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import QuestionsList from "../Questions/QuestionsList";
import LandingPage from "../LandingPage/LandingPage";

const Login = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  // const [type, setType] = useState("password");
  // const [visibility, setVisibilitiy] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //Password visiblity

  // const handleToogle = () => {
  //   if (type === "password") {
  //     setVisibilitiy(true);
  //     setType("text");
  //   } else {
  //     setVisibilitiy(false);
  //     setType("password");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user data to database to be logged in
      const loginRes = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      //update global state with response from backend(user-info)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate user to homepage
      navigate("/");
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData.user, navigate]);

  return (
    <>
      <LandingPage
        sign={
          <>
            <div className="login">
              <h3>Login to Your Account</h3>
              <div className="login__CreateAct">
                <span className="login__CreateActP">
                  Don't Have an Account?
                </span>
                <Link to="/signup" className="CrtAct">
                  Create a new account
                </Link>
              </div>
              <form onSubmit={handleSubmit}>
                <br />
                {/* <label>Email: </label> <br/> */}
                <input
                  placeholder="Your Email"
                  type="text"
                  name="email"
                  onChange={handleChange}
                />
                <br /> <br />
                {/* <label>Password: </label> */}
                <input
                  placeholder="Your Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
                <br /> <br />
                <button>Submit</button>
              </form>
              <br />
              <Link className="CrtAct" to="/signup">
                Create an account?
              </Link>
            </div>
          </>
        }
      />
    </>
  );
};
export default Login;
