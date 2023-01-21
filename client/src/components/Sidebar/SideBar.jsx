import React, { useState } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import {
  ManageAccounts,
  PlaylistRemove,
  PlaylistAdd,
  DensityMedium,
  KeyboardDoubleArrowLeft,
  History,
  Home,
  PowerSettingsNew,
  Insights,
} from "@mui/icons-material";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="sidebar">
        <div className="py-2 mt-2 mb-5 head w-100">
          <div className="w-100 d-flex justify-content-start">
            <DensityMedium
              onClick={() => setShow(!show)}
              sx={{
                color: "black",
                cursor: "pointer",
                display: !show ? "block" : "none",
              }}
            />
          </div>
          <div className="w-100 d-flex justify-content-end">
            <KeyboardDoubleArrowLeft
              onClick={() => setShow(!show)}
              sx={{
                color: "black",
                cursor: "pointer",
                display: show ? "block" : "none",
              }}
            />
          </div>
        </div>
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <Home
            color="black"
            cursor="pointer"
            onClick={() => navigate("/home")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/home")}
          >
            Home
          </button>
        </div>
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <ManageAccounts
            color="black"
            cursor="pointer"
            onClick={() => navigate("/profile")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </div>
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <PlaylistAdd
            color="black"
            cursor="pointer"
            onClick={() => navigate("/buy")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/buy")}
          >
            Buy Units
          </button>
        </div>
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <PlaylistRemove
            color="black"
            cursor="pointer"
            onClick={() => navigate("/sell")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/sell")}
          >
            Sell Units
          </button>
        </div>
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <History
            color="black"
            cursor="pointer"
            onClick={() => navigate("/history")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/history")}
          >
            Transaction History
          </button>
        </div>
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <Insights
            color="black"
            cursor="pointer"
            onClick={() => navigate("/analysis")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/analysis")}
          >
            Analytics & Predictions
          </button>
        </div>
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <PowerSettingsNew
            color="black"
            cursor="pointer"
            onClick={() => navigate("/signin")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/signin")}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
