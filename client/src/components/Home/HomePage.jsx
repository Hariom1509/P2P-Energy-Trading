import React, { useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import { CurrencyRupee, DoubleArrow } from "@mui/icons-material";
import "./HomePage.css";
import solar from "../../assets/solar.jpg";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

const HomePage = () => {
  const context = useContext(UserContext);
  const { user, getUser } = context;

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="c1">
          <h1>Welcome to the Dashboard !</h1>
          <div className="w-100 p-3 m-2 bg-white mt-5 shadow">
            <h2>{user.name}</h2>
            <h4>{user.email}</h4>
          </div>
          <div className="w-100 p-3 m-2 bg-white d-flex justify-content-around flex-column mt-5 box shadow">
            <div className="d-flex justify-content-between mt-3 p-2">
              <span>Available balance</span>
              <span className="text-muted">
                <CurrencyRupee />
                1234
              </span>
            </div>
            <div className="d-flex justify-content-between mt-3 p-2">
              <span>Units bought</span>
              <span className="text-muted">3</span>
            </div>
            <div className="d-flex justify-content-between mt-3 p-2">
              <span>Units sold</span>
              <span className="text-muted">1</span>
            </div>
          </div>
          <div className="w-100 p-3 m-2 bg-white d-flex justify-content-around flex-column mt-5 box shadow">
            <div className="d-flex justify-content-between mt-2 p-2">
              <span>Get your bills</span>
              <span>
                <DoubleArrow cursor="pointer" color="success" />
              </span>
            </div>
          </div>
        </div>
        <div className="c2">
          <img
            src={solar}
            style={{ width: `${100}%`, height: `${100}%` }}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
