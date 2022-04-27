import React, { useState, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { useNavigate, Link, Navigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/users/login", user)
      .then((res) => {
        alert("Login Successfully");
        localStorage.setItem("authToken", res.data);
        navigate("/employee");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <br />
      <br />
      <Box
        style={{ display: "flex", justifyContent: "center" }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 528,
            height: 980,
          },
        }}
      >
        <form onSubmit={(e) => login(e)}>
          <Paper elevation={3}>
            <h2>
              <center>
                <font color="black">Login</font>
              </center>
            </h2>

            <Grid
              container
              direction={"row"}
              spacing={4}
              style={{ padding: "30px" }}
            >
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  required
                  autoComplete="email"
                  helperText={!user.email ? "please enter name" : ""}
                  style={{ width: 400, marginLeft: "30px" }}
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  required
                  autoComplete="password"
                  helperText={!user.password ? "please enter name" : ""}
                  style={{ width: 400, marginLeft: "30px" }}
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <br />

              <Grid item xs={13} align="center">
                <Button
                  variant="contained"
                  style={{ width: "400px" }}
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Box>
    </div>
  );
}

export default Login;
