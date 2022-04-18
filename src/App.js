import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link ,Navigate} from "react-router-dom";
import Employee from './components/Employee';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
function App() {
 const [employeeData,setEmployeeData]=useState([])
 useEffect(()=>{
  const data=JSON.parse(localStorage.getItem("employee"))
  console.log(data)
    if(data) 
    setEmployeeData(data)
 },[])
useEffect(()=>{
  localStorage.setItem("employee",JSON.stringify(employeeData))

},[employeeData])

  const addEmployeeHandler=(employee)=>{
    setEmployeeData([...employeeData,employee])
  }

const deleteRecord=(index)=>{
  const temp = employeeData.filter((i,v)=>{
    return v!==index
  })
  setEmployeeData(temp)
}

  return (
    <div className="App">
     <Router>
      <Routes>
      <Route path="/" element={<Navigate replace to={"/employee"} />} />  
      <Route path="/employee" element={<Employee employeeData={employeeData} deleteRecord={deleteRecord}/>} />    
      <Route path="/employee/add" element={<AddEmployee addEmployeeHandler={addEmployeeHandler}/>} />       
      <Route path="/employees/update/:id" element={<UpdateEmployee employeeData={employeeData} setEmployeeData={setEmployeeData}/>} />       
      </Routes>
      </Router>
      
     
    </div>
  );
}

export default App;
