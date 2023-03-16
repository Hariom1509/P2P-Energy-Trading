import React, { useState } from "react";
import "./SignIn.css";
import "../Forms.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../Context/UserState";

const signIn = () => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  // const context = useContext(UserContext);
  // const { setuser } = context;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const [mess, setMess] = useState("");

  const login = async () => {
    const { email, password } = credentials;
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.authtoken);

      // setuser(
      //   data.user.id,
      //   data.user.name,
      //   data.user.email,
      //   data.user.mobileNumber,
      //   data.user.type,
      //   data.user.area
      // );

      // console.log(data.user, data.success);
      navigate("/home");
    } else {
      setErr(true);
      setMess(data.message);
    }
  };

  return (
    <div className="w-100 h-100 d-flex justify-content-center main-content">
      <div className="form-content2 m-auto">
        <form className="content">
          <div className="mb-4 col-12 form-head"> Sign in to account! </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={credentials.email}
              placeholder="Email address"
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={credentials.password}
              placeholder="Password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>

          <div className="mt-1 col-12">
            <button
              type="submit"
              className="btn btn-primary col-12"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Sign in
            </button>
            <div className="row justify-content-end">
              <div className="tip mb-3 mt-1 col-auto reset">
                Forgot Password?{" "}
                <button onClick={() => navigate("/forget")}>Click here</button>
              </div>
            </div>
            <div className="mt-3 mb-1 col-12 tip">Don't have an account?</div>
            <button
              type="submit"
              className="btn btn-primary col-12"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
          {err ? (
            <div>
              <div
                className="mt-1 text-warning text-break text-center"
                style={{ fontFamily: "Times New Roman" }}
              >
                {mess}
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default signIn;
