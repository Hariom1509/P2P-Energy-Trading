import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import "./HistoryPage.css";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

const HistoryPage = () => {
  const context = useContext(UserContext);
  const { user, getUser } = context;
  const [id, setId] = useState("avirajrathod2002.ar@gmail.com");

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
    const t = getID(id);
  }, []);

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
      </div>
    </>
  );
};

export default HistoryPage;
