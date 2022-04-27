import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Employee from "./components/Employee";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const data = JSON.parse(localStorage.getItem("employee"));
  const [employeeData, setEmployeeData] = useState(data ? data : []);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    localStorage.setItem("employee", JSON.stringify(employeeData));
  }, [employeeData]);

  const addEmployeeHandler = (employee) => {
    setEmployeeData([...employeeData, employee]);
  };

  const deleteRecord = (index) => {
    const temp = employeeData.filter((i, v) => {
      return v !== index;
    });
    setEmployeeData(temp);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to={"/register"} />} />

          <Route path="/employee" element={<Employee token={token} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee/add" element={<AddEmployee token={token} />} />
          <Route
            path="/employees/update/:id"
            element={<UpdateEmployee token={token} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
