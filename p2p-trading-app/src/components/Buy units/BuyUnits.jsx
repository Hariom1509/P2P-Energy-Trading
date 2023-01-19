import React from "react";
import SideBar from "../Sidebar/SideBar";
import "./BuyUnits.css";
import { ShoppingCart, CurrencyRupee, Add } from "@mui/icons-material";
import { useState } from "react";

const BuyUnits = () => {
  const [seller, setSeller] = useState("seller");
  const [price, setPrice] = useState(0);
  const [maxUnits, setMaxUnits] = useState("0");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(0);
  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="container-fluid d-flex justify-content-around align-items-center">
          <div className="conten">
            <div className="sec2">
              <ShoppingCart sx={{ fontSize: `${4.5}rem`, color: "green" }} />
              <h3 className="ttl">Buy units</h3>
            </div>
            <div className="sec">
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <select
                  className="form-select classic"
                  id="validationDefault03"
                  onChange={(e) => {
                    let val = e.target.value;
                    let num = 0;
                    let newVal = "";
                    let cnt = 0;
                    for (let i = 0; i < val.length; i++) {
                      if (val[i] === ",") {
                        if (cnt === 0) setSeller(newVal);
                        else {
                          num = parseInt(newVal);
                          setPrice(num);
                          setAmount(num * unit);
                        }
                        newVal = "";
                        cnt++;
                        i++;
                        continue;
                      }
                      newVal += val[i];
                    }
                    setMaxUnits(newVal);
                    newVal = "";
                  }}
                  required
                >
                  <option value="Area" disabled selected>
                    Seller, unit price, total units
                  </option>
                  <option value="Hariom Vyas, 7, 5">Hariom Vyas, 7, 5</option>
                  <option value="Reeti Shah, 8, 2">Reeti Shah, 8, 2</option>
                </select>
              </div>
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <span className="ttl">Seller</span>
                <span className="ttc">{seller}</span>
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
                max={maxUnits}
                style={{
                  background: "white",
                  border: `${1}px solid silver`,
                  borderRadius: `${5}px`,
                  textAlign: "center",
                }}
                onChange={(e) => {
                  let val = parseInt(e.target.value);
                  if (val > parseInt(maxUnits)) {
                    alert(
                      `You can buy at max ${maxUnits} units, so ${maxUnits} will be considered..!`
                    );
                    val = parseInt(maxUnits);
                  }
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
              <button className="bg-success text-white px-3 py-2 mt-2 mb-3 b1">
                <Add /> Buy units
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyUnits;
