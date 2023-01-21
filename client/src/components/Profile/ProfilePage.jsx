import { AccountCircle } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import "./ProfilePage.css";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { user, getUser } = context;

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="container-fluid d-flex justify-content-around align-items-center">
          <div className="contenP">
            <div className="cnt">
              <div className="sec">
                <AccountCircle
                  sx={{ fontSize: `${6.5}rem`, color: "goldenrod" }}
                />
                <h3 className="ttl">{user.name}</h3>
                <div className="w-100 my-1 py-2 d-flex justify-content-between">
                  <span className="ttl">E-mail</span>
                  <span className="ttc">{user.email}</span>
                </div>
                <div className="w-100 my-1 py-2 d-flex justify-content-between">
                  <span className="ttl">Phone</span>
                  <span className="ttc">+91 {user.mobileNumber}</span>
                </div>
                <div className="w-100 my-1 py-2 d-flex justify-content-between">
                  <span className="ttl">Type</span>
                  <span className="ttc">{user.type}</span>
                </div>
                <div className="w-100 my-1 py-2 d-flex justify-content-between">
                  <span className="ttl">Area</span>
                  <span className="ttc">{user.area}</span>
                </div>
              </div>
            </div>
            <div className="cnt">
              <div className="sec">
                <div className="w-100 my-1 py-3 d-flex justify-content-between">
                  <span className="ttl">Password & Security</span>
                  <button className="ttc" onClick={() => navigate("/forget")}>
                    Change
                  </button>
                </div>
              </div>
              <div className="sec">
                <div className="w-100 my-1 py-3 d-flex justify-content-between">
                  <span className="ttl">Generation Details</span>
                  <button className="ttc" onClick={() => navigate("/details")}>
                    Get details
                  </button>
                </div>
              </div>
              <div className="sec">
                <div className="w-100 my-1 py-3 d-flex justify-content-between">
                  <span className="ttl">Funds</span>
                  <button
                    className="ttc"
                    style={{ pointerEvents: user.varified ? "auto" : "none" }}
                    onClick={() => navigate("/funds")}
                  >
                    Check
                  </button>
                </div>
              </div>
              <div className="sec">
                <div className="w-100 my-1 py-3 d-flex justify-content-between">
                  <span className="ttl">Verify document to activate Funds</span>
                  <input type="file" id="upload" hidden />
                  <label for="upload">Choose file</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
