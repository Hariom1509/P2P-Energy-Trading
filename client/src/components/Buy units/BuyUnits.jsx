import React, { useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import Web3 from "web3";
import axios from "axios";
import "./BuyUnits.css";
import { ShoppingCart, CurrencyRupee, Add } from "@mui/icons-material";
import { useState } from "react";

const BuyUnits = () => {
  const [success, setSuccess] = useState(false);
  const [mess, setMess] = useState("");
  const [err, setErr] = useState(false);
  const [seller, setSeller] = useState("seller name");
  const [price, setPrice] = useState(0);
  const [maxUnits, setMaxUnits] = useState("0");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(0);
  const [id, setId] = useState("Initial id");
  const [units, setUnits] = useState([]);

  let flag = false;

  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:7545")
  );

  web3.eth.net
    .isListening()
    .then((s) => {
        console.log("Blockchain connection active");
        flag = true;
    })
    .catch((e) => {
        flag = false;
        console.log("Blockchain not connected");
    });

  const updateUnits = async () => {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/unit/updateunits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        price,
        unitsToUpdate: -1 * unit,
        _id: id,
      }),
    });
    const data = await response.json();
    if (data.success && flag === true) {
      setSuccess(true);
      axios({
        method: "post",
        url: "http://localhost:5000/api/postuserorder",
        headers: {},
        data: {
          pid: seller,
          cid: seller,
          area: "390015",
          kwh: unit,
          price: price,
          cbal: 100,
        },
      }).then((res) => {
        console.log(res.status);
        console.log(res);
      }).then(() => {
        setMess(data.messgae);
        alert('Order Successfull');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else setErr(true);
    setMess(data.message);


  };
  const FetchUnits = async () => {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/unit/fetchunits`, {
      method: "GET",
    });
    const data = await response.json();
    setUnits(data);
  };
  // const Update = (e) => {

  // };
  useEffect(() => {
    FetchUnits();
  }, []);
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
                    const val = e.target.value;
                    const details = val.split(",");
                    setId(details[0]);
                    setSeller(details[1]);
                    setPrice(parseInt(details[2]));
                    setMaxUnits(details[3]);
                    setErr(false);
                    setSuccess(false);
                    setMess("");
                  }}
                  required
                >
                  <option value="Area" selected disabled>
                    seller, unit price, total units
                  </option>
                  {units.map((unit) => (
                    <option
                      value={[
                        unit.userID,
                        unit.userName,
                        unit.price,
                        unit.units,
                      ]}
                      key={unit.userID}
                    >
                      {unit.userID}, {unit.price}, {unit.units}
                    </option>
                  ))}
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
                  setErr(false);
                  setSuccess(false);
                  setMess("");
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
              <button
                className="bg-success text-white px-3 py-2 mt-2 mb-3 b1"
                onClick={updateUnits}
              >
                <Add /> Buy units
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
        </div>
      </div>
    </>
  );
};

export default BuyUnits;
