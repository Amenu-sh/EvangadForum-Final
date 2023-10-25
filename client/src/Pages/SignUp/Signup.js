import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import "./SignUp.css";

import LandingPage from "../LandingPage/LandingPage";

const SignUp = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  //importing global state from context
  const [userData, setUserData] = useContext(UserContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be registered in database
      await axios.post("http://localhost:4000/api/users", form);

      //once registered the login automatically so send the new user info to be logged in
      const loginRes = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // set the global state with the new user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
      console.log("you've been thrown to the bin");
    }
  };
  return (
    <>
      <LandingPage
        sign={
          <>
            <div className="signup">
              <h3>Join the network</h3>
              <div>
                <span>Already have an account? </span>
                <Link className="link" to="/login">
                  Sign In
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                {/* <label>Email: </label> */}
                <br />
                <input
                  placeholder="Email"
                  type="text"
                  name="email"
                  onChange={handleChange}
                />
                <br />
                <br />
                {/* <label>First Name: </label> */}
                <div className="signup__names">
                  <input
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                  />

                  {/* <label>Last Name: </label> */}
                  <input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                  />
                </div>

                <br />
                {/* <label>User Name: </label> */}
                <input
                  placeholder="User Name"
                  type="text"
                  name="userName"
                  onChange={handleChange}
                />
                <br />
                <br />
                {/* <label>Password: </label>  */}
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
                <br />
                <br />
                <button type="submit">Agree and Join</button>
              </form>

              <p>
                I agree to the <span className="link"> Privacy policy </span>and
                <span className="link"> terms of services</span>
              </p>
              <Link className="link" to="/login">
                Already have an account?
              </Link>
            </div>
          </>
        }
      />
    </>
  );
};

export default SignUp;
