import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import "./HistoryPage.css";
import Web3 from "web3";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

const HistoryPage = () => {
  const context = useContext(UserContext);
  const { user, getUser } = context;
  const [id, setId] = useState("avirajrathod2002.ar@gmail.com");

  let flag = false;

  console.log(user.email);

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

    const getProOrder = async() => {
      console.log(user.email);
        const res = await fetch(
          "http://localhost:5000/api/getprorder/",
          {
            method: 'POST',
            headers : {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            body: JSON.stringify({
              pid: user.email,
            }),
          });

        const json = await res.json();

        console.log(json.document);
        console.log(json.document.length);

        if(json.status === 200){
          console.log("Prosumer Selling Data Retrieved!!")
        } else {
          console.log(json.message);
        }
    }

    const getConOrder = async() => {
      console.log(user.email);
        const res = await fetch(
          "http://localhost:5000/api/getconorder/",
          {
            method: 'POST',
            headers : {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            body: JSON.stringify({
              cid: user.email,
            }),
          });

        const json = await res.json();

        console.log(json.document);
        console.log(json.document.length);

        if(json.status === 200){
          console.log("Consumer Data Retrieved!!")
        } else {
          console.log(json.message);
        }
    }

  const getID = (email) => {
    const host = "http://localhost:5000";
    fetch(`${host}/api/auth/transactionids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setId(data);
        return data;
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getUser();   
  }, [])

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="Table">
          {user.type === "Prosumer" ? (
            <div className="Prosumer mb-3">
              <h4 className="text-success p-1">Selling History</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Consumer ID</th>
                    <th scope="col">Area</th>
                    <th scope="col">Kwh</th>
                    <th scope="col">Price</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{id}</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}
          <div className="Consumer mb-3">
            <h4 className="text-danger p-1">Buying History</h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Prosumer ID</th>
                  <th scope="col">Area</th>
                  <th scope="col">Kwh</th>
                  <th scope="col">Price</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={getConOrder}>Get Consumer Order</button>
        <button onClick={getProOrder}>Get Prosumer Order</button>
      </div>
    </>
  );
};

export default HistoryPage;
