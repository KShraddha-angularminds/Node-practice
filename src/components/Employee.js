import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@material-ui/icons//Delete";
import EditIcon from "@material-ui/icons//Edit";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";

function Employee({ token }) {
  const [flag, setFlag] = useState(false);
  const deleteEmp = (index) => {
    axios
      .delete(`http://localhost:3001/api/employ/${index}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        console.log(res);
        setFlag(!flag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/employ")
      .then((res) => {
        console.log(res);
        setEmployeeData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);
  console.log(employeeData);
  return (
    <div style={{ marginTop: "50px" }}>
      <Box textAlign="center">
        <Link to="/employee/add">
          <Button variant="contained">Add Employee</Button>
        </Link>
      </Box>
      <TableContainer
        component={Paper}
        style={{
          marginLeft: "40px",
          margin: "50px",

          width: "93%",
        }}
      >
        <Table
          // sx={{ minWidth: 650 }}
          aria-label="simple table"
          sx={{ mx: "auto" }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData?.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {row.name.charAt(0)}
                </Avatar>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.mobile}</TableCell>

                <IconButton
                  aria-label="delete"
                  onClick={() => deleteEmp(row._id)}
                >
                  <DeleteIcon />
                </IconButton>
                <Link to={`/employees/update/${row._id}`}>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>{" "}
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Employee;
