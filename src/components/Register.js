import React, { useState, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/users/register", user)
      .then((res) => {
        console.log(res);
        alert("Sign up Successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(user);
  return (
    <div>
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
          <form onSubmit={(e) => addUser(e)}>
            <Paper elevation={3}>
              <h2>
                <center>
                  <font color="black">Sign Up</font>
                </center>
              </h2>

              <Grid
                container
                direction={"row"}
                spacing={4}
                style={{ padding: "30px" }}
              >
                <Grid item xs={12} style={{ marginLeft: "30px" }}>
                  <TextField
                    style={{ width: "400px" }}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    name="name"
                    helperText={!user.name ? "please enter name" : ""}
                    onChange={(e) => changeHandler(e)}
                    required
                  />
                </Grid>
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
                    autoComplete="password"
                    helperText={!user.password ? "please enter name" : ""}
                    style={{ width: 400, marginLeft: "30px" }}
                    onChange={(e) => changeHandler(e)}
                    required
                  />
                </Grid>
                <br />

                <Grid item xs={13} align="center">
                  <Button
                    variant="contained"
                    style={{ width: "400px" }}
                    type="submit"
                  >
                    SIGN UP
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default Register;
