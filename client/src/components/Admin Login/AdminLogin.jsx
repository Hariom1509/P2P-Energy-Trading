import React, { useState, useEffect } from "react";
import "./AdminLogin.css";
import { PowerSettingsNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [mess, setMess] = useState("");
  const [err, setErr] = useState(false);

  const UpdateUser = async (_id) => {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/auth/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        _id
      }),
    });
    const data = await response.json();
    if (data.success) {
      setSuccess(true);
      window.location.reload();
    }
    else setErr(true);
    setMess(data.message);
  };

  const FetchUsers = async () => {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/auth/fetchusers`, {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    FetchUsers();
  }, []);

  return (
    <>
      <div className="header">
        <div>
          <PowerSettingsNew
            color="black"
            cursor="pointer"
            onClick={() => navigate("/signin")}
          />{" "}
          <button
            className="px-2 logout"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Sign Out
          </button>
        </div>
        {success ? (
          <div
            className="p-1 mt-1 text-success text-center"
            style={{ fontFamily: "Times New Roman" }}
          >
            {mess}
          </div>
        ) : (
          ""
        )}
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
      </div>
      <div className="dashboard">
        {users.map((user) => (
          <div
            className="card"
            style={{ boxShadow: `${0.5}px ${-0.5}px ${2}px ${2}px silver` }}
            key={user._id}
          >
            <div className="card-header text-danger">{user.name}</div>
            <div className="card-body">
              <p className="tip text-dark">{user.type}</p>
              <p className="tip">{user.email}</p>
              <p className="tip">{user.mobileNumber}</p>
              <p className="tip">{user.area}</p>
              <button
                className="btn btn-primary col-12"
                onClick={() => {
                  UpdateUser(user._id);
                }}
              >
                Verify
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminLogin;
