import React from "react";
import SideBar from "../Sidebar/SideBar";
import "./SellUnits.css";
import { Sell, CurrencyRupee, Remove } from "@mui/icons-material";
import { useState } from "react";

const SellUnits = () => {
  const [price, setPrice] = useState(8);
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(0);
  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="container-fluid d-flex justify-content-around align-items-center">
          <div className="conten">
            <div className="sec2">
              <Sell sx={{ fontSize: `${4.5}rem`, color: "red" }} />
              <h3 className="ttl">Sell units</h3>
            </div>
            <div className="sec">
              <div className="w-100 my-1 py-1 d-flex justify-content-between flex-column">
                <h6 className="ttl">Unit price (between 5 and 8 rupees)</h6>
                <input
                  type="range"
                  id="points"
                  name="points"
                  min="5"
                  max="8"
                  className="w-100"
                  onChange={(e) => {
                    let val = e.target.value;
                    setPrice(parseInt(val));
                    setAmount(val * unit);
                  }}
                />
              </div>
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <span className="ttl">Price</span>
                <span className="ttc">
                  <CurrencyRupee sx={{ fontSize: `${1}rem` }} />
                  {price}
                </span>
              </div>
            </div>
            <div className="sec3">
              <h6 className="ttl">Select number of units to buy</h6>
              <input
                className="ttl text-warning"
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                style={{
                  background: "white",
                  border: `${1}px solid silver`,
                  borderRadius: `${5}px`,
                  textAlign: "center",
                }}
                onChange={(e) => {
                  let val = parseInt(e.target.value);
                  setUnit(val);
                  setAmount(val * price);
                }}
                required
              ></input>
            </div>
            <div className="sec">
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <span className="ttl">Total amount</span>
                <span className="ttc">
                  <CurrencyRupee sx={{ fontSize: `${1}rem` }} />
                  {amount}
                </span>
              </div>
            </div>
            <div className="sec5">
              <button className="bg-danger text-white px-3 py-2 mt-2 mb-3 b1">
                <Remove /> Sell units
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellUnits;
