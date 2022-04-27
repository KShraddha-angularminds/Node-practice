import React, { useState, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Slider from "@mui/material/Slider";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddEmployee(props) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const navigate = useNavigate();
  const [cState, setCState] = useState({});
  const [city, setCity] = useState({});
  const hobby = ["Dancing", "Singing", "Writing", "Crafting"];
  const storedData = localStorage.getItem("employee");
  const [newHobby, setNewHobby] = useState("");
  const [validate, setValidate] = useState({});
  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/states/India", {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2tAdW5pdmVyc2FsLXR1dG9yaWFsLmNvbSIsImFwaV90b2tlbiI6IlQ2VlBOUmZXbkxFbmdsMHd2djctZ1d2Y09KRHFPSkptc3ZoNkNOdGo5a3p1Z1RSYkhvdXVET1NXeTdzYmJzdG5taDAifSwiZXhwIjoxNjUxMDYyMjE5fQ.PPnbznmcN9koqf74kdrrOpZ8X_AuVNoYRWwaIfGzcIU",
        },
      })
      .then((res) => {
        setCState(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const defaultEmpObject = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    state: "",
    city: "",
    date: "",
    gender: "",
    password: "",
    hobbies: [],
    com_skill: "",
  };
  const [employee, setEmployee] = useState(defaultEmpObject);

  const setStateDistrict = (v) => {
    setEmployee({ ...employee, state: v });
    axios
      .get(`https://www.universal-tutorial.com/api/cities/${v}`, {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2tAdW5pdmVyc2FsLXR1dG9yaWFsLmNvbSIsImFwaV90b2tlbiI6IlQ2VlBOUmZXbkxFbmdsMHd2djctZ1d2Y09KRHFPSkptc3ZoNkNOdGo5a3p1Z1RSYkhvdXVET1NXeTdzYmJzdG5taDAifSwiZXhwIjoxNjUxMDYyMjE5fQ.PPnbznmcN9koqf74kdrrOpZ8X_AuVNoYRWwaIfGzcIU",
        },
      })
      .then((res) => {
        setCity(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const h = [];
  const handleCheckbox = (e, isChecked) => {
    console.log(isChecked, e.target.value);
    return isChecked
      ? setEmployee({
          ...employee,
          hobbies: [...employee.hobbies, e.target.value],
        })
      : "";
  };

  const addEmployee = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/employ/addEmploy", employee)
      .then((res) => {
        console.log(res);
        navigate("/employee");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkboxHandler = () => {
    setEmployee({ ...employee, hobbies: [...employee.hobbies, newHobby] });
    setNewHobby("");
  };

  const checkboxClickHandler = (e) => {
    let idx = "";
    let temp = [...employee.hobbies];
    if (employee.hobbies.length > 0) {
      for (let i = 0; i < employee.hobbies.length; i++) {
        if (employee.hobbies[i] === e.target.value) {
          idx = i;
          break;
        }
      }
    }
    if (idx !== "") temp.splice(idx, 1);
    else temp.push(e.target.value);
    setEmployee({ ...employee, hobbies: temp });
  };
  let flag = false;
  const validateData = () => {
    if (employee.mobile.length <= 10) {
      flag = true;
    } else {
      flag = false;
      setValidate({ mobile: "Mobile should be less than 10 digits" });
    }
    return flag;
  };

  console.log(validate);
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
        <form onSubmit={(e) => addEmployee(e)}>
          <Paper elevation={3}>
            <h2>
              <center>
                <font color="black">Add Employee Details</font>
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
                  error={!employee.name ? true : false}
                  id={!employee.name ? `outlines-error` : `outlined-basic`}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={employee.name}
                  name="name"
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                  helperText={!employee.name ? "please enter name" : ""}
                  required
                />
                <TextField
                  error={!employee.email ? true : false}
                  id={!employee.email ? `outlines-error` : `outlined-basic`}
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={employee.email}
                  name="email"
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                  required
                  autoComplete="email"
                  helperText={!employee.email ? "please enter email" : ""}
                  style={{ width: 220, marginLeft: "12px" }}
                />
              </Grid>

              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Mobile"
                  value={employee.mobile}
                  name="mobile"
                  onChange={(e) =>
                    setEmployee({ ...employee, mobile: e.target.value })
                  }
                  autoComplete="phone"
                  variant="outlined"
                />

                <TextareaAutosize
                  aria-label="empty textarea"
                  minRows={3}
                  placeholder={"Address"}
                  value={employee.address}
                  name="address"
                  autoComplete="address"
                  onChange={(e) =>
                    setEmployee({ ...employee, address: e.target.value })
                  }
                  style={{ width: 220, marginLeft: "12px" }}
                />
              </Grid>
              <div>
                <span style={{ color: "red", marginLeft: "30px" }}>
                  {validate.mobile}
                </span>
              </div>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cState}
                  getOptionLabel={(cState) => cState.state_name}
                  renderInput={(params) => (
                    <TextField {...params} label="States" variant="outlined" />
                  )}
                  onChange={(event, value) =>
                    setStateDistrict(value.state_name)
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box"
                  options={city}
                  getOptionLabel={(city) => city.city_name}
                  renderInput={(params) => (
                    <TextField {...params} label="City" variant="outlined" />
                  )}
                  onChange={(event, value) =>
                    setEmployee({ ...employee, city: value.city_name })
                  }
                />
              </Grid>

              <Grid item sx={12} style={{ width: "5000px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={employee.date}
                    onChange={(newValue) => {
                      setEmployee({
                        ...employee,
                        date: moment(newValue).format("DD-MM-YYYY"),
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <br />
              <Grid item>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) =>
                    setEmployee({ ...employee, gender: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </Grid>

              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                onChange={(e) =>
                  setEmployee({ ...employee, password: e.target.value })
                }
                variant="outlined"
                style={{ marginLeft: "30px", marginBottom: "5px" }}
                required
              />

              <br />
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Hobbies"
                  variant="outlined"
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                />
                <Button
                  variant="contained"
                  style={{ marginLeft: "20px" }}
                  onClick={checkboxHandler}
                >
                  Add Hobby
                </Button>

                <FormGroup>
                  {employee.hobbies.map((hobby, j) => {
                    return (
                      <FormControlLabel
                        key={j}
                        control={<Checkbox />}
                        value={hobby}
                        label={hobby}
                        checked={true}
                        onClick={checkboxClickHandler}
                      />
                    );
                  })}
                </FormGroup>
              </Grid>

              <Grid item>
                <Box width={230}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Communication Skills
                  </FormLabel>

                  <Slider
                    aria-label="Default"
                    onChange={(e) =>
                      setEmployee({ ...employee, com_skill: e.target.value })
                    }
                    valueLabelDisplay="auto"
                    max={5}
                  />
                </Box>
              </Grid>

              <Grid item xs={13} align="center">
                <Button
                  variant="contained"
                  // onClick={addEmployee}
                  style={{ width: "400px" }}
                  type="submit"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Box>
    </div>
  );
}

export default AddEmployee;
