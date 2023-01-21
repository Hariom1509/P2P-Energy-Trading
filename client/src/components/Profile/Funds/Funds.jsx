import React from "react";
import SideBar from "../../Sidebar/SideBar";
import "./Funds.css";
import {
  AccountBalance,
  CurrencyRupee,
  Add,
  SettingsBackupRestore,
} from "@mui/icons-material";

const Funds = () => {
  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="container-fluid d-flex justify-content-around align-items-center">
          <div className="conten">
            <div className="sec2">
              <AccountBalance sx={{ fontSize: `${5.5}rem`, color: "blueviolet" }} />
              <h3 className="ttl">Funds</h3>
            </div>
            <div className="sec3">
              <h6 className="ttl">Available margin (cash)</h6>
              <h4 className="ttl text-danger">
                <CurrencyRupee />
                1234
              </h4>
            </div>
            <div className="sec4">
              <button className="bg-success text-white px-3 py-2 mt-2 mb-3 b1">
                <Add /> Add funds
              </button>
              <button className="bg-info text-white px-3 py-2 mt-2 mb-3 b2">
                <SettingsBackupRestore /> Withdraw
              </button>
            </div>
            <div className="sec2">
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <span className="ttl">Available margin</span>
                <span className="ttc"><CurrencyRupee sx={{fontSize: `${1}rem`}} />1234</span>
              </div>
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <span className="ttl">Used margin</span>
                <span className="ttc"><CurrencyRupee sx={{fontSize: `${1}rem`}} />0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
